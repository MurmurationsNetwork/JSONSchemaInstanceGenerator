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

  it('should generate a profile with some fields missing', () => {
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

  it('should generate a profile with linked schemas', () => {
    const data = {
      linked_schemas: 'schema1, schema2, schema3'
    }

    const expectedProfile = {
      linked_schemas: ['schema1', 'schema2', 'schema3']
    }

    const profile = generateSchemaInstance(schema, data)

    expect(profile).toEqual(expectedProfile)
  })
})
