# @hrbrain/use-name-space-import

- ⚙️ This rule is included in "plugin:@hrbrain/recommended".

## 📖 Rule Details

Use [name space import.](https://tc39.es/ecma262/#prod-NameSpaceImport)

Name space import(ex: `import * as React from 'react'`) has some advantages.

- Be able to Tree Shakings.
- Avoid duplicate name of variables that import module.

### 👎

```ts
/*eslint @hrbrain/use-name-space-import: "warn"*/
import React from "react";
import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
```

### 👍

```ts
/*eslint @hrbrain/use-name-space-import: "warn"*/
import * as React from "react";
import * as ReduxToolkit from "@reduxjs/toolkit";
```

## 🔧 Options

### `allowNotNameSpaceImportModules`

```json
{
  "rules": {
    "@hrbrain/use-name-space-import": [
      "warn",
      { "allowNotNameSpaceImportModules": ["@reduxjs/toolkit"] }
    ]
  }
}
```

### 👍

```ts
/*eslint @hrbrain/use-name-space-import: ["warn", { "allowNotNameSpaceImportModules": ["@reduxjs/toolkit"] }]*/
import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
```

- `allowNotNameSpaceImportModules` (`string[]`) ... Specify the module name you don't have to change into name space import.
  - Able to use [minimatch](https://github.com/isaacs/minimatch).
    - example ... `{ "allowNotNameSpaceImportModules": ["lodash/fp/*", "react"] }`
  - Default ... `[""]`

### `allowDefaultImport`

```json
{
  "rules": {
    "@hrbrain/use-name-space-import": ["warn", { "allowDefaultImport": true }]
  }
}
```

### 👍

```ts
/*eslint @hrbrain/use-name-space-import: ["warn", { "allowDefaultImport": true }]*/
import React from "react";
import flow from "lodash/fp/flow";
```

### 👎

```ts
/*eslint @hrbrain/use-name-space-import: ["warn", { "allowDefaultImport": true }]*/
import React, { useState } from "react";
```

- `allowDefaultImport` (`boolean`) ... Allow import member that exported default. Like `export default fn`
  - Default ... `false`
