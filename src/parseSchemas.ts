import refParser from '@apidevtools/json-schema-ref-parser'

export async function parseSchemas(
  url: string,
  schemaName: string[]
): Promise<any> {
  if (schemaName.length === 0) {
    throw new Response('No schema name provided', {
      status: 400
    })
  }

  let mergedSchema: any
  if (schemaName.length > 1) {
    const schemas: any[] = []

    // Need to wait all results and then return the data
    await Promise.all(
      schemaName.map(async name => {
        const res = await retrieveSchema(url, name)
        schemas.push(res)
      })
    )

    // Remove duplicate properties
    // todo: we only merge properties, required and schema here. If we need the other properties here, we should add it here.
    mergedSchema = schemas[0]
    const linked_schema = schemas[0].metadata.schema.name
    mergedSchema.metadata.schema = []
    mergedSchema.metadata.schema.push(linked_schema)
    schemas
      .filter((_, index) => index !== 0)
      .forEach(val => {
        // Properties field
        Object.keys(val.properties).forEach(schemasName => {
          if (!(schemasName in mergedSchema.properties)) {
            mergedSchema.properties[schemasName] = val.properties[schemasName]
          }
        })

        // Required field
        const originalRequired = mergedSchema.required
        const newRequired = val.required
        mergedSchema.required = originalRequired.concat(newRequired)

        // metadata-schema
        mergedSchema.metadata.schema.push(val.metadata.schema.name)
      })
  } else {
    mergedSchema = await retrieveSchema(url, schemaName[0])
    // replace schema
    const linked_schema = mergedSchema.metadata.schema.name
    mergedSchema.metadata.schema = []
    mergedSchema.metadata.schema.push(linked_schema)
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
