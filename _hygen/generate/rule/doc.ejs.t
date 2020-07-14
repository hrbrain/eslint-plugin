---
to: docs/rules/<%= name %>.md
---
# @hrbrain/<%= name %>

## 📖 Rule Details

<%= description %>

### 👎

```ts
/*eslint @hrbrain/<%= name %>: "error"*/
```

### 👍

```ts
/*eslint @hrbrain/<%= name %>: "error"*/
```

## 🔧 Options

```json
{
  "rules": {
    "@hrbrain/<%= name %>": [
      "error",
      { "prefer": "React.FC" }
    ]
  }
}
```

- `prefer` (`string`) ... Specify the type you prefer.
  - Default ... `""`