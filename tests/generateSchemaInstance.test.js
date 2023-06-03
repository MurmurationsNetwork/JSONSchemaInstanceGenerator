import { generateSchemaInstance } from '../src'

describe('generateSchemaInstance', () => {
  const schema = {
    type: 'object',
    properties: {
      name: { type: 'string' },
      age: { type: 'number' },
      address: {
        type: 'object',
        properties: {
          street: { type: 'string' },
          city: { type: 'string' },
          state: { type: 'string' },
          zip: { type: 'string' }
        }
      },
      phone_numbers: {
        type: 'array',
        items: {
          type: 'string'
        }
      }
    }
  }

  it('should generate a profile with all fields', () => {
    const data = {
      name: 'John Doe',
      age: '30',
      'address.street': '123 Main St',
      'address.city': 'Anytown',
      'address.state': 'CA',
      'address.zip': '12345',
      'phone_numbers[0]': '555-1234',
      'phone_numbers[1]': '555-5678'
    }

    const expectedProfile = {
      name: 'John Doe',
      age: 30,
      address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zip: '12345'
      },
      phone_numbers: ['555-1234', '555-5678']
    }

    const profile = generateSchemaInstance(schema, data)

    expect(profile).toEqual(expectedProfile)
  })

  it('should generate a profile without including empty fields', () => {
    const data = {
      name: 'Jane Smith',
      age: '',
      'address.street': '',
      'address.city': 'Anytown',
      'address.state': 'CA',
      'address.zip': '',
      'phone_numbers[0]': ''
    }

    const expectedProfile = {
      name: 'Jane Smith',
      address: {
        city: 'Anytown',
        state: 'CA'
      }
    }

    const profile = generateSchemaInstance(schema, data)

    expect(profile).toEqual(expectedProfile)
  })

  it('should generate a profile with deeply nested fields', () => {
    const schema2 = {
      type: 'object',
      properties: {
        connections: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              subject_url: {
                type: 'string'
              },
              object_url: {
                type: 'string'
              },
              relationships: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    type: {
                      type: 'string'
                    },
                    qualifiers: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          type: {
                            type: 'string'
                          },
                          condition: {
                            type: 'array',
                            items: {
                              type: 'string'
                            }
                          }
                        },
                        required: ['condition']
                      }
                    },
                    id: {
                      type: 'string'
                    },
                    respects: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          domain: {
                            type: 'string'
                          },
                          strength: {
                            type: 'number'
                          }
                        },
                        required: ['domain', 'strength']
                      }
                    },
                    relationship_url: {
                      type: 'string'
                    }
                  },
                  required: ['type']
                }
              }
            },
            required: ['relationships', 'object_url']
          }
        }
      }
    }

    const data = {
      'connections[0].subject_url': '',
      'connections[0].object_url': 'https://some.object.com',
      'connections[0].relationships[0].type': 'some type',
      'connections[0].relationships[0].qualifiers[0].type': 'adjective',
      'connections[0].relationships[0].qualifiers[0].condition[0]': 'tasty',
      'connections[0].relationships[0].id': '',
      'connections[0].relationships[0].respects[0].domain': 'some domain',
      'connections[0].relationships[0].respects[0].strength': '99',
      'connections[0].relationships[0].relationship_url':
        'https://some.relationship.com'
    }

    const expectedProfile = {
      connections: [
        {
          object_url: 'https://some.object.com',
          relationships: [
            {
              type: 'some type',
              qualifiers: [
                {
                  type: 'adjective',
                  condition: ['tasty']
                }
              ],
              respects: [
                {
                  domain: 'some domain',
                  strength: 99
                }
              ],
              relationship_url: 'https://some.relationship.com'
            }
          ]
        }
      ]
    }

    const profile = generateSchemaInstance(schema2, data)

    expect(profile).toEqual(expectedProfile)
  })

  it('should generate a profile with multiple linked schemas', () => {
    const data = {
      linked_schemas: 'schema1,schema2, schema3'
    }

    const expectedProfile = {
      linked_schemas: ['schema1', 'schema2', 'schema3']
    }

    const profile = generateSchemaInstance(schema, data)

    expect(profile).toEqual(expectedProfile)
  })
})
