# @hrbrain/prefer-function-component-type

## 📖 Rule Details

This rule reports the React Function Component that don't unify it's type.

### 👎

```ts
/*eslint @hrbrain/prefer-function-component-type: ["error", { prefer: 'React.FC' }]*/
export const App: FunctionComponent = () => <div>aaa</div>;
```

### 👍

```ts
/*eslint @hrbrain/prefer-function-component-type: ["error", { prefer: 'React.FC' }]*/
export const App: React.FC = () => <div>aaa</div>;
```

## 🔧 Options

```json
{
  "rules": {
    "@hrbrain/prefer-function-component-type": [
      "error",
      { "prefer": "React.FC" }
    ]
  }
}
```

- `prefer` (`string`) ... Specify the type you prefer.
  - Default ... `""`
