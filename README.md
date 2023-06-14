# JSON Schema Instance Generator

> This project is licensed under the terms of the GNU General Public License v3.0

## Installation

Using npm:

```sh
npm install @murmurations/jsig
```

## Examples

### 1. parseSchemas

```javascript
import { parseSchemas } from '@murmurations/jsig'

const url = 'https://example.com/schema.json'
const schemaNames = ['schema1', 'schema2']

try {
  const result = await parseSchemas(url, schemaNames)
  console.log(result)
} catch (error) {
  console.error(error)
}
```

### 2. generateSchemaInstance

```javascript
import { generateSchemaInstance } from '@murmurations/jsig'

const schema = {
  // Schema definition
}

const data = {
  // Input data
  name: 'John Doe',
  age: 30,
  email: 'john.doe@example.com',
  // If key contains ".", it will be parsed to an Object
  'address.zip': 10000,
  'address.city': 'City',
  // If key contains "[]", it will be parsed to an Array
  'tags[0]': 'self'
}

try {
  const result = await generateSchemaInstance(schema, data)
  console.log(result)
} catch (error) {
  console.error(error)
}
```

## Local Development

### Install dependencies

```sh
npm install
```

### Build the package

```sh
npm run build
```

### Use package in another project (run command in that project's directory)

```sh
npm install --no-save ../JSONSchemaInstanceGenerator
```

### Install latest pre-release version in another project (run command in that project's directory)

```sh
npm install @murmurations/jsig@pre
```

## Reference

1. [ECMAScript Modules in Node.js](https://www.typescriptlang.org/docs/handbook/esm-node.html)
2. [Best practices for creating a modern npm package](https://snyk.io/blog/best-practices-create-modern-npm-package/)
3. [Gotchas in Remix](https://remix.run/docs/en/main/pages/gotchas)
