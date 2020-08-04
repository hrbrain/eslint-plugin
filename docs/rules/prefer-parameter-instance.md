# @hrbrain/prefer-parameter-instance

## 📖 Rule Details

Check generics paramater instance whether expected

###

### 👎

```ts
/*eslint @hrbrain/prefer-parameter-instance: ["error", {onlyReference: true}]*/

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
/*eslint @hrbrain/prefer-parameter-instance: ["error", {onlyReference: true}]*/

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

### `onlyReference`

```json
{
  "rules": {
    "@hrbrain/prefer-parameter-instance": ["error", { "onlyReference": true }]
  }
}
```

```ts
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

### `allowKeywords`

```json
{
  "rules": {
    "@hrbrain/prefer-parameter-instance": [
      "error",
      {
        "onlyReference": true,
        "allowKeywords": true
      }
    ]
  }
}
```

```ts
type User<T> = {
  age: T;
};

const user1: User<string> = {
  age: "20",
};

const user2: User<number> = {
  age: 20,
};
```

- `allowKeywords` (`boolean`) ... Generics param's type allow type `keywords`.
  - See: [TSKeywordMap](https://github.com/hrbrain/eslint-plugin/blob/master/lib/util/keywords.ts)
  - Default ... `false`
