# @hrbrain/use-name-space-import

## 📖 Rule Details

Use [name space import.](https://tc39.es/ecma262/#prod-NameSpaceImport)
Don't use named import.
Currently, [React recommends name space import.](https://github.com/facebook/react/pull/18102)

### 👎

```ts
/*eslint @hrbrain/use-name-space-import: ["error", { modules: ['react'] }]*/
import React from "react";
```

### 👍

```ts
/*eslint @hrbrain/use-name-space-import: ["error", { modules: ['react'] }]*/
import * as React from "react";
```

## 🔧 Options

```json
{
  "rules": {
    "@hrbrain/use-name-space-import": ["error", { "modules": ["react"] }]
  }
}
```

- `modules` (`string[]`) ... Specify the module name you want to change into name space import.
  - Default ... `[""]`
