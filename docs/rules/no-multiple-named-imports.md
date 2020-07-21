# @hrbrain/no-multiple-named-imports

- ⚙️ This rule is included in "plugin:@hrbrain/recommended".

## 📖 Rule Details

Don't imports as named import from a module

### 👎

```ts
/*eslint @hrbrain/no-multiple-named-imports: "error"*/

import { FC, FunctionComponent } from "react";
```

### 👍

```ts
/*eslint @hrbrain/no-multiple-named-imports: "error"*/

import { FC } from "react";
```

## 🔧 Options

Nothing.
