import { parseSchemas } from '../src'

describe('parseSchemas', () => {
  let url = 'https://test-library.murmurations.network/v2/schemas'

  it('should return correct schema for a single schema', async () => {
    let schemaName = ['karte_von_morgen-v1.0.0']

    const result = await parseSchemas(url, schemaName)

    const expected = {
      $schema: 'https://json-schema.org/draft-07/schema#',
      $id: 'https://test-library.murmurations.network/v2/schemas/karte_von_morgen-v1.0.0',
      title: 'Map of Tomorrow / Karte von Morgen',
      description:
        'Entries (Initiatives, Organisations, Companies) from Kartevonmorgen.org',
      type: 'object',
      properties: {
        linked_schemas: {
          title: 'Linked Schemas',
          description:
            'A list of schemas against which a profile must be validated (schema names must be alphanumeric with underscore(_) spacers and dash(-) semantic version separator, e.g., my_data_schema-v1.0.0)',
          type: 'array',
          items: {
            type: 'string',
            pattern: '^[a-z][a-z0-9_]{7,97}-v[0-9]+\\.[0-9]+\\.[0-9]+$'
          },
          minItems: 1,
          uniqueItems: true,
          metadata: {
            creator: {
              name: 'Murmurations Network',
              url: 'https://murmurations.network'
            },
            field: {
              name: 'linked_schemas',
              version: '1.0.0'
            },
            purpose:
              'This field is required in all Murmurations schemas to ensure that a profile is valid and can be posted to the Index. It is the only required field in the default-v2.0.0 schema, which is the schema used by the Index to process incoming profiles.'
          }
        },
        name: {
          title: 'Name',
          description:
            'The name of the entity, organization, project, item, etc.',
          type: 'string',
          metadata: {
            creator: {
              name: 'Murmurations Network',
              url: 'https://murmurations.network'
            },
            field: {
              name: 'name',
              version: '1.0.0'
            },
            context: ['https://schema.org/name'],
            purpose:
              'The common name that is generally used to refer to the entity, organization, project, item, etc., which can be a living being, a legal entity, an object (real or virtual) or even a good or service.'
          }
        },
        primary_url: {
          title: 'Primary URL',
          description:
            'The primary URL of the entity or item (i.e., its unique, canonical and definitive website address)',
          type: 'string',
          maxLength: 2000,
          metadata: {
            creator: {
              name: 'Murmurations Network',
              url: 'https://murmurations.network'
            },
            field: {
              name: 'primary_url',
              version: '1.0.0'
            },
            context: ['https://schema.org/identifier'],
            purpose:
              'The primary URL is used to uniquely identify the entity or item, and is usually represented as a website address or specific web page that is well-known to be linked to the entity. It can be used to link to the entity or item from other entities or items.'
          }
        },
        description: {
          title: 'Description',
          description:
            'A description of the item, entity, organization, project, etc.',
          type: 'string',
          metadata: {
            creator: {
              name: 'Murmurations Network',
              url: 'https://murmurations.network'
            },
            field: {
              name: 'description',
              version: '1.0.0'
            },
            context: ['http://schema.org/description'],
            purpose:
              'The Description field can be used to provided a description of the item, entity, organization, project, etc. We have chosen not to add a maximum length but aggregators may snip the first ~160 characters of this field to provide a summary in directory listings or maps, so make sure the first sentence provides a good overview of the entity you are describing.'
          }
        },
        latitude: {
          title: 'Latitude',
          description: 'A decimal amount between -90 and 90',
          type: 'number',
          minimum: -90,
          maximum: 90,
          metadata: {
            creator: {
              name: 'Murmurations Network',
              url: 'https://murmurations.network'
            },
            field: {
              name: 'latitude',
              version: '1.0.0'
            },
            context: ['https://schema.org/latitude']
          }
        },
        longitude: {
          title: 'Longitude',
          description: 'A decimal amount between -180 and 180',
          type: 'number',
          minimum: -180,
          maximum: 180,
          metadata: {
            creator: {
              name: 'Murmurations Network',
              url: 'https://murmurations.network'
            },
            field: {
              name: 'longitude',
              version: '1.0.0'
            },
            context: ['https://schema.org/longitude']
          }
        },
        locality: {
          title: 'Locality',
          description:
            'The locality (city, town, village, etc.) where the entity is located',
          type: 'string',
          metadata: {
            creator: {
              name: 'Murmurations Network',
              url: 'https://murmurations.network'
            },
            field: {
              name: 'locality',
              version: '1.0.0'
            },
            context: ['https://schema.org/addressLocality']
          }
        },
        region: {
          title: 'Region',
          description:
            'The region (state, county, province, etc.) where the entity is located',
          type: 'string',
          metadata: {
            creator: {
              name: 'Murmurations Network',
              url: 'https://murmurations.network'
            },
            field: {
              name: 'region',
              version: '1.0.0'
            },
            context: ['https://schema.org/addressRegion']
          }
        },
        country_name: {
          title: 'Country name',
          description: 'The name of country where the entity is based',
          type: 'string',
          metadata: {
            creator: {
              name: 'Murmurations Network',
              url: 'https://murmurations.network'
            },
            field: {
              name: 'country_name',
              version: '1.0.0'
            },
            context: ['https://schema.org/Country'],
            purpose:
              "A free form field to enter a country's name. The Index will try to match that text to a country's name and will store the country's two-letter ISO-3166-1 code in the Index database to enable searching by country for the entity. The name-to-ISO mapping is here: https://github.com/MurmurationsNetwork/MurmurationsLibrary/blob/main/countries/map.json"
          }
        },
        email: {
          title: 'Contact Email',
          description: 'An email address at which to contact the entity',
          type: 'string',
          metadata: {
            creator: {
              name: 'Murmurations Network',
              url: 'https://murmurations.network'
            },
            field: {
              name: 'email',
              version: '1.0.0'
            },
            context: ['https://schema.org/email'],
            purpose:
              "Provides a contact email address for an entity. It is a free form text field without validation so that an email can be entered in a less machine-readable format (e.g., 'myname at somedomain dot org')."
          }
        },
        image: {
          title: 'Image',
          description:
            'The URL of an image or logo starting with http:// or https://',
          type: 'string',
          maxLength: 2000,
          pattern: '^https?://.*',
          metadata: {
            creator: {
              name: 'Murmurations Network',
              url: 'https://murmurations.network'
            },
            field: {
              name: 'image',
              version: '1.0.0'
            },
            context: ['https://schema.org/image'],
            purpose:
              'An image that is generally used to refer to the entity, organization, project, item, etc.'
          }
        },
        kvm_category: {
          title: 'Type of Entry',
          description:
            'KVM category for the entity: Initiative (non-profit), Company (for-profit)',
          type: 'array',
          items: {
            type: 'string'
          },
          uniqueItems: true
        },
        tags: {
          title: 'Tags',
          description:
            'Keywords relevant to this entity and its activities or attributes, searchable in the Murmurations index',
          type: 'array',
          items: {
            type: 'string'
          },
          uniqueItems: true,
          metadata: {
            creator: {
              name: 'Murmurations Network',
              url: 'https://murmurations.network'
            },
            field: {
              name: 'tags',
              version: '1.0.0'
            },
            context: ['https://schema.org/keywords'],
            purpose:
              'Tags holds a list of unique keywords that are used to describe any aspect of the entity, such that there is enough information to fit the entity into a variety of data taxonomies.'
          }
        }
      },
      required: ['linked_schemas', 'name', 'primary_url'],
      metadata: {
        creator: {
          name: 'Karte von Morgen',
          url: 'https://www.kartevonmorgen.org'
        },
        schema: ['karte_von_morgen-v1.0.0']
      }
    }

    expect(result).toEqual(expected)
  })

  it('should return correct schema if schemas is more than one', async () => {
    let schemaName = [
      'offers_wants_prototype-v0.0.1',
      'karte_von_morgen-v1.0.0'
    ]

    const result = await parseSchemas(url, schemaName)

    const expected = {
      properties: {
        linked_schemas: {
          title: 'Linked Schemas',
          description:
            'A list of schemas against which a profile must be validated (schema names must be alphanumeric with underscore(_) spacers and dash(-) semantic version separator, e.g., my_data_schema-v1.0.0)',
          type: 'array',
          items: {
            type: 'string',
            pattern: '^[a-z][a-z0-9_]{7,97}-v[0-9]+\\.[0-9]+\\.[0-9]+$'
          },
          minItems: 1,
          uniqueItems: true,
          metadata: {
            creator: {
              name: 'Murmurations Network',
              url: 'https://murmurations.network'
            },
            field: {
              name: 'linked_schemas',
              version: '1.0.0'
            },
            purpose:
              'This field is required in all Murmurations schemas to ensure that a profile is valid and can be posted to the Index. It is the only required field in the default-v2.0.0 schema, which is the schema used by the Index to process incoming profiles.'
          }
        },
        exchange_type: {
          title: 'Exchange Type',
          description:
            "Are you offering ('selling') or wanting ('buying') something?",
          type: 'string',
          enum: ['offer', 'want'],
          enumNames: [
            'Offer - I have something to lend, lease, sell or donate',
            'Want - I want to borrow, rent, buy or receive something'
          ]
        },
        item_type: {
          title: 'Item Type',
          description:
            'Is it a good (something made) or service (something performed)?',
          type: 'string',
          enum: ['good', 'service'],
          enumNames: [
            'Good - a tangible or intangible item to be delivered from the giver to the receiver',
            'Service - a service to be performed by the giver for the receiver'
          ]
        },
        transaction_type: {
          title: 'Transaction Type',
          description: 'On what basis do you want to exchange the item?',
          type: 'string',
          enum: ['borrow-lend', 'rent-lease', 'buy-sell', 'receive-donate'],
          enumNames: [
            'Borrow/Lend - I want to borrow or lend the item',
            'Rent/Lease - I want to rent or lease the item',
            'Buy/Sell - I want to buy or sell the item',
            'Receive/Donate - I want to receive or donate the item'
          ]
        },
        tags: {
          title: 'Tags',
          description:
            'Keywords relevant to the good or service you are offering or wanting.',
          type: 'array',
          items: {
            type: 'string'
          },
          uniqueItems: true
        },
        title: {
          title: 'Title',
          description:
            'A few words describing the good or service you are offering or wanting.',
          type: 'string'
        },
        description: {
          title: 'Description',
          description:
            'A longer description (1 to 3 sentences) of the good or service you are offering or wanting.',
          type: 'string'
        },
        image: {
          title: 'Image',
          description: 'An image URL (starting with https:// or http://)',
          type: 'string',
          pattern: '^https?://.*'
        },
        details_url: {
          title: 'Item Details URL',
          description:
            'A webpage (starting with https:// or http://) with further details about the item you are offering or wanting.',
          type: 'string',
          pattern: '^https?://.*'
        },
        geolocation: {
          title: 'Geolocation',
          description:
            'The geo-coordinates (in decimal format) where the item is available or wanted.',
          type: 'object',
          properties: {
            lat: {
              title: 'Latitude',
              type: 'number',
              minimum: -90,
              maximum: 90
            },
            lon: {
              title: 'Longitude',
              type: 'number',
              minimum: -180,
              maximum: 180
            }
          },
          required: ['lat', 'lon']
        },
        geographic_scope: {
          title: 'Geographic Scope',
          description:
            'The geographic scope of the avalability of or wish for the item.',
          type: 'string',
          enum: ['local', 'regional', 'national', 'international'],
          enumNames: [
            'Local - Within a city or nearby towns',
            'Regional - Within a state, province, or region',
            'National - Within a country',
            'International - Worldwide'
          ]
        },
        contact_details: {
          title: 'Contact Details',
          description:
            'The contact details for the person or organization offering or wanting the item (fill in at least one).',
          type: 'object',
          properties: {
            email: {
              title: 'Email Address',
              description: 'Your email address.',
              type: 'string'
            },
            contact_form: {
              title: 'Contact Form',
              description:
                'A webpage (starting with https:// or http://) with a contact form that can be used to reach you.',
              type: 'string',
              pattern: '^https?://.*'
            }
          }
        },
        expires_at: {
          title: 'Expires At',
          description:
            'The date and time (a Unix timestamp, e.g., 1651848477) when this offer or want expires.',
          type: 'number'
        },
        name: {
          title: 'Name',
          description:
            'The name of the entity, organization, project, item, etc.',
          type: 'string',
          metadata: {
            creator: {
              name: 'Murmurations Network',
              url: 'https://murmurations.network'
            },
            field: {
              name: 'name',
              version: '1.0.0'
            },
            context: ['https://schema.org/name'],
            purpose:
              'The common name that is generally used to refer to the entity, organization, project, item, etc., which can be a living being, a legal entity, an object (real or virtual) or even a good or service.'
          }
        },
        primary_url: {
          title: 'Primary URL',
          description:
            'The primary URL of the entity or item (i.e., its unique, canonical and definitive website address)',
          type: 'string',
          maxLength: 2000,
          metadata: {
            creator: {
              name: 'Murmurations Network',
              url: 'https://murmurations.network'
            },
            field: {
              name: 'primary_url',
              version: '1.0.0'
            },
            context: ['https://schema.org/identifier'],
            purpose:
              'The primary URL is used to uniquely identify the entity or item, and is usually represented as a website address or specific web page that is well-known to be linked to the entity. It can be used to link to the entity or item from other entities or items.'
          }
        },
        latitude: {
          title: 'Latitude',
          description: 'A decimal amount between -90 and 90',
          type: 'number',
          minimum: -90,
          maximum: 90,
          metadata: {
            creator: {
              name: 'Murmurations Network',
              url: 'https://murmurations.network'
            },
            field: {
              name: 'latitude',
              version: '1.0.0'
            },
            context: ['https://schema.org/latitude']
          }
        },
        longitude: {
          title: 'Longitude',
          description: 'A decimal amount between -180 and 180',
          type: 'number',
          minimum: -180,
          maximum: 180,
          metadata: {
            creator: {
              name: 'Murmurations Network',
              url: 'https://murmurations.network'
            },
            field: {
              name: 'longitude',
              version: '1.0.0'
            },
            context: ['https://schema.org/longitude']
          }
        },
        locality: {
          title: 'Locality',
          description:
            'The locality (city, town, village, etc.) where the entity is located',
          type: 'string',
          metadata: {
            creator: {
              name: 'Murmurations Network',
              url: 'https://murmurations.network'
            },
            field: {
              name: 'locality',
              version: '1.0.0'
            },
            context: ['https://schema.org/addressLocality']
          }
        },
        region: {
          title: 'Region',
          description:
            'The region (state, county, province, etc.) where the entity is located',
          type: 'string',
          metadata: {
            creator: {
              name: 'Murmurations Network',
              url: 'https://murmurations.network'
            },
            field: {
              name: 'region',
              version: '1.0.0'
            },
            context: ['https://schema.org/addressRegion']
          }
        },
        country_name: {
          title: 'Country name',
          description: 'The name of country where the entity is based',
          type: 'string',
          metadata: {
            creator: {
              name: 'Murmurations Network',
              url: 'https://murmurations.network'
            },
            field: {
              name: 'country_name',
              version: '1.0.0'
            },
            context: ['https://schema.org/Country'],
            purpose:
              "A free form field to enter a country's name. The Index will try to match that text to a country's name and will store the country's two-letter ISO-3166-1 code in the Index database to enable searching by country for the entity. The name-to-ISO mapping is here: https://github.com/MurmurationsNetwork/MurmurationsLibrary/blob/main/countries/map.json"
          }
        },
        email: {
          title: 'Contact Email',
          description: 'An email address at which to contact the entity',
          type: 'string',
          metadata: {
            creator: {
              name: 'Murmurations Network',
              url: 'https://murmurations.network'
            },
            field: {
              name: 'email',
              version: '1.0.0'
            },
            context: ['https://schema.org/email'],
            purpose:
              "Provides a contact email address for an entity. It is a free form text field without validation so that an email can be entered in a less machine-readable format (e.g., 'myname at somedomain dot org')."
          }
        },
        kvm_category: {
          title: 'Type of Entry',
          description:
            'KVM category for the entity: Initiative (non-profit), Company (for-profit)',
          type: 'array',
          items: {
            type: 'string'
          },
          uniqueItems: true
        }
      },
      required: [
        'linked_schemas',
        'exchange_type',
        'item_type',
        'transaction_type',
        'tags',
        'title',
        'description',
        'geolocation',
        'geographic_scope',
        'contact_details',
        'name',
        'primary_url'
      ],
      metadata: {
        schema: ['offers_wants_prototype-v0.0.1', 'karte_von_morgen-v1.0.0']
      },
      type: 'object'
    }

    expect(result).toEqual(expected)
  })

  it('should throw an error if the schema is empty', async () => {
    const schemaName = []

    await expect(parseSchemas(url, schemaName)).rejects.toThrowError()
  })

  it('should throw an error if the schema is invalid', async () => {
    const schemaName = ['invalid schema']

    await expect(parseSchemas(url, schemaName)).rejects.toThrowError()
  })
})
