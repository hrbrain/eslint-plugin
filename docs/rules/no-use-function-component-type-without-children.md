# @hrbrain/no-use-function-component-type-without-children

- ⚙️ This rule is included in "plugin:@hrbrain/recommended".

## 📖 Rule Details

Don't use Function Component type without props.children.

- This rule judge as Function Component type that `FC` and `FunctionCompnent` type
- This rule judge as Function Component when variables contains JSXElement at the return value

### 👎

```ts
/*eslint @hrbrain/no-use-function-component-type-without-children: "error"*/

import * as React from "react";

type Props = {
  name: string;
};

export const Component1: React.FC<Props> = (props) => <div>{props.name}</div>;

export const Component2: React.FunctionComponent<Props> = (props) => (
  <div>{props.name}</div>
);

export const Component3: React.FunctionComponent<Props> = (props) => {
  const { name } = props;
  return <div>{name}</div>;
};

export const Component4: React.FunctionComponent<Props> = (props) => {
  const name = props["name"];
  return <div>{name}</div>;
};

export const Component5: React.FunctionComponent<Props> = (props) => {
  const name = props.name;
  return <div>{name}</div>;
};
```

### 👍

```ts
/*eslint @hrbrain/no-use-function-component-type-without-children: "error"*/


import * as React from 'react';

type Props = {
  name: string;
};

export const Component1: = (props: Props): React.ReactElement => <div>{props.name}</div>;

export const Component2: React.FunctionComponent<Props> = (props) => {
  const { children } = props
  return (
    <div>{children}</div>
  )
};

export const Component3: React.FC<Props> = (props: Props) => {
  const componentChildren = props['children']
  return (
    <div>{componentChildren}</div>
  )
};

export const Component3: React.FC<Props> = (props: Props) => {
  const componentChildren = props.children
  return (
    <div>{componentChildren}</div>
  )
};
```

## 🔧 Options

Nothing.
