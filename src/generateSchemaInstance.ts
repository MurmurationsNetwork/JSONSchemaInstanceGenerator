export function generateSchemaInstance(schema: any, data: any): any {
  let profile: any = {}

  Object.keys(data)
    .filter(fieldName => data[fieldName] !== '')
    .forEach(fieldName => {
      if (fieldName === 'linked_schemas') {
        profile[fieldName] = data[fieldName]
          .split(',')
          .map((s: string) => s.trim())
      } else if (fieldName.includes('[') || fieldName.includes('.')) {
        profile = parseArrayObject(fieldName, data[fieldName], schema, profile)
      } else {
        if (schema?.properties[fieldName]?.type === 'number') {
          profile[fieldName] = parseFloat(data[fieldName])
        } else {
          profile[fieldName] = data[fieldName]
        }
      }
    })
  return profile
}

function parseArrayObject(
  fieldName: string,
  fieldData: any,
  schema: any,
  profile: any
): any {
  const props = fieldName.split('.')
  let curr = profile
  let currSchema = schema

  for (let i = 0; i < props.length; i++) {
    const prop = props[i]
    const matches = prop.match(/(.+)\[(\d+)]/)

    if (matches) {
      const name = matches[1]
      const index = parseInt(matches[2])

      // Create the array if it doesn't exist yet
      if (!curr[name]) {
        curr[name] = []
      }

      // Create the object at the specified index if it doesn't exist yet
      if (props.length > 1 && !curr[name][index]) {
        curr[name][index] = {}
      }

      // Move the current pointer to the object at the specified index
      if (i === props.length - 1) {
        if (currSchema?.properties[name]?.items?.type === 'number') {
          fieldData = parseFloat(fieldData)
        }
        curr[name][index] = fieldData
      } else {
        curr = curr[name][index]
        currSchema = currSchema?.properties[name]?.items
      }
    } else {
      // Create the object if it doesn't exist yet
      if (!curr[prop]) {
        curr[prop] = {}
      }

      // Move the current pointer to the object
      if (i === props.length - 1) {
        if (
          currSchema &&
          currSchema.properties &&
          Object.prototype.hasOwnProperty.call(currSchema.properties, prop)
        ) {
          if (currSchema?.properties[prop]?.type === 'number') {
            fieldData = parseFloat(fieldData)
          }
          curr[prop] = fieldData
        }
      } else {
        curr = curr[prop]
        currSchema = currSchema?.properties[prop]
      }
    }
  }

  return profile
}
