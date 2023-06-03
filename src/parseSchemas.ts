import refParser from '@apidevtools/json-schema-ref-parser'

interface schema {
  type: string
  properties: object
  required: string[]
  metadata: {
    schema: string[]
  }
}

export async function parseSchemas(
  url: string,
  schemaName: string[]
): Promise<any> {
  if (schemaName.length === 0) {
    throw new Response('No schema name provided', {
      status: 400
    })
  }

  let mergedSchema: schema = {
    type: 'object',
    properties: {},
    required: [],
    metadata: {
      schema: []
    }
  }

  if (schemaName.length > 1) {
    const schemas: any[] = []

    // Need to wait all results and then return the data
    // Create an array to store the promises to solve the order problem
    const promises = schemaName.map(async name => {
      return await retrieveSchema(url, name)
    })
    const resolvedSchemas = await Promise.all(promises)
    schemas.push(...resolvedSchemas)

    // Remove duplicate properties
    // todo: we only merge properties, required and schema here. If we need the other properties here, we should add it here.
    schemas.forEach((val, index) => {
      if (index === 0) {
        mergedSchema.properties = val.properties
        mergedSchema.required = val.required
        mergedSchema.metadata.schema = [val.metadata.schema.name]
      } else {
        // Properties field
        Object.keys(val.properties).forEach(schemasName => {
          if (!(schemasName in mergedSchema.properties)) {
            mergedSchema.properties[schemasName] = val.properties[schemasName]
          }
        })

        // Required field
        mergedSchema.required = Array.from(
          new Set(mergedSchema.required.concat(val.required))
        )

        // metadata-schema
        mergedSchema.metadata.schema.push(val.metadata.schema.name)
      }
    })
  } else {
    const getSchema = await retrieveSchema(url, schemaName[0])
    mergedSchema = getSchema
    mergedSchema.metadata.schema = [getSchema.metadata.schema.name]
  }

  return mergedSchema
}

async function retrieveSchema(url: string, schemaName: string): Promise<any> {
  const schemaUrl = `${url}/${schemaName}`
  return await refParser.dereference(schemaUrl).catch(err => {
    throw new Response(`parseRef error: ${err}`, {
      status: 500
    })
  })
}
