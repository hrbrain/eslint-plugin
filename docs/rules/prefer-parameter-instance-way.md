# @hrbrain/prefer-parameter-instance-way

## 📖 Rule Details

Check generics paramater instance way whether expected

###

### 👎

```ts
/*eslint @hrbrain/prefer-parameter-instance-way: ["error", {onlyReference: true}]*/

type User<T> = {
  name: string;
  info: T;
};

const user: User<{
  age: number;
  blood: string;
}> = {
  name: "user",
  info: {
    age: 20,
    blood: "O",
  },
};
```

### 👍

```ts
/*eslint @hrbrain/prefer-parameter-instance-way: ["error", {onlyReference: true}]*/

type User<T> = {
  name: string;
  info: T;
};

type UserProps = {
  age: number;
  blood: string;
};

const user: User<UserProps> = {
  name: "user",
  info: {
    age: 20,
    blood: "O",
  },
};
```

## 🔧 Options

```json
{
  "rules": {
    "@hrbrain/prefer-parameter-instance-way": [
      "error",
      { "onlyReference": true }
    ]
  }
}
```

```ts
/*eslint @hrbrain/prefer-parameter-instance-way: ["error", {onlyReference: true}]*/

type User<T> = {
  name: string;
  info: T;
};

type UserProps = {
  age: number;
  blood: string;
};

const user: User<UserProps> = {
  name: "user",
  info: {
    age: 20,
    blood: "O",
  },
};
```

- `onlyReference` (`boolean`) ... Generics param's type allow type only `TSTypeReference`.
  - Default ... `false`
- `allowKeywords` (`boolean`) ... Generics param's type allow type `keywords`.
  - See: [TSKeywordMap](https://github.com/hrbrain/eslint-plugin/blob/master/lib/util/keywords.ts)
  - Default ... `false`
