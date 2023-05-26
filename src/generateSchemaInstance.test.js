import { generateSchemaInstance } from './generateSchemaInstance'

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
          zip: { type: 'string' },
        },
      },
      phone_numbers: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
    },
  }

  it('should generate a profile with all fields', () => {
    const data = {
      name: 'John Doe',
      age: '30',
      address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zip: '12345',
      },
      phone_numbers: ['555-1234', '555-5678'],
    }

    const expectedProfile = {
      name: 'John Doe',
      age: 30,
      address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zip: '12345',
      },
      phone_numbers: ['555-1234', '555-5678'],
    }

    const profile = generateSchemaInstance(schema, data)

    expect(profile).toEqual(expectedProfile)
  })

  it('should generate a profile with some fields missing', () => {
    const data = {
      name: 'Jane Smith',
      age: '',
      address: {
        street: '',
        city: 'Anytown',
        state: 'CA',
        zip: '',
      },
      phone_numbers: [],
    }

    const expectedProfile = {
      name: 'Jane Smith',
      address: {
        city: 'Anytown',
        state: 'CA',
      },
      phone_numbers: [],
    }

    const profile = generateSchemaInstance(schema, data)
    console.log(profile)

    expect(profile).toEqual(expectedProfile)
  })

  it('should generate a profile with array objects', () => {
    const data = {
      'address.street': ['123 Main St', '456 Second St'],
      'address.city': ['Anytown', 'Othertown'],
      'address.state': ['CA', 'NY'],
      'address.zip': ['12345', '67890'],
    }

    const expectedProfile = {
      address: [
        { street: '123 Main St', city: 'Anytown', state: 'CA', zip: '12345' },
        { street: '456 Second St', city: 'Othertown', state: 'NY', zip: '67890' },
      ],
    }

    const profile = generateSchemaInstance(schema, data)

    expect(profile).toEqual(expectedProfile)
  })

  it('should generate a profile with linked schemas', () => {
    const data = {
      linked_schemas: 'schema1, schema2, schema3',
    }

    const expectedProfile = {
      linked_schemas: ['schema1', 'schema2', 'schema3'],
    }

    const profile = generateSchemaInstance(schema, data)

    expect(profile).toEqual(expectedProfile)
  })
})
