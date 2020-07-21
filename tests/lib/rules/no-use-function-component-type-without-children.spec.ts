import { RuleTester } from "../../util";

import rule from "../../../lib/rules/no-use-function-component-type-without-children";

const tester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
});

tester.run("no-use-function-component-type-without-children", rule, {
  valid: [
    {
      code: `
      import * as React from "react";

      type Props = {
        name: string;
      };

      export const Component = (props: Props) => <div>{props.name}</div>;
    `,
    },
    {
      code: `
      import * as React from "react";

      type Props = {
        name: string;
      };

      export const Component: React.FC<Props> = (props) => <div>{props.name} <p>{props.children}</p></div>;
    `,
    },
    {
      code: `
      import * as React from "react";

      type Props = {
        name: string;
      };

      export const Component: React.FC<Props> = (props) => {
        const foobarchildren = props.children
        return (
          <div>{props.name} <p>{foobarchildren}</p></div>
        )
      };
    `,
    },
    {
      code: `
      import * as React from "react";

      type Props = {
        name: string;
      };

      export const Component: React.FC<Props> = (props) => {
        const foobarchildren = props['children']
        return (
          <div>{props.name} <p>{foobarchildren}</p></div>
        )
      };
    `,
    },
    {
      code: `
      import * as React from "react";

      type Props = {
        name: string;
      };

      export const Component: React.FC<Props> = (props) => {
        const { children } = props
        return (
          <div>{props.name} <p>{children}</p></div>
        )
      };
    `,
    },
    {
      code: `
      import * as React from "react";

      type Props = {
        name: string;
      };

      export const Component = (props): React.ReactElement => <div>{props.name}</div>
    `,
    },
  ],
  invalid: [
    {
      code: `
      import * as React from 'react';
      type Props = {
        name: string;
      };
      export const Component: React.FunctionComponent<Props> = (props: Props) => <div>{props.name}</div>;
      `,
      errors: [{ messageId: "noUseFunctionComponentTypeWithoutChildren" }],
    },
    {
      code: `
      import { FunctionComponent } from 'react';
      type Props = {
        name: string;
      };
      export const Component: FunctionComponent<Props> = (props: Props) => <div>{props.name}</div>;
      `,
      errors: [{ messageId: "noUseFunctionComponentTypeWithoutChildren" }],
    },
    {
      code: `
      import * as React from 'react';
      type Props = {
        name: string;
      };
      export const Component: React.FC<Props> = (props: Props) => <div>{props.name}</div>;
      `,
      errors: [{ messageId: "noUseFunctionComponentTypeWithoutChildren" }],
    },
    {
      code: `
      import { FC } from 'react';
      type Props = {
        name: string;
      };
      export const Component: FC<Props> = (props: Props) => <div>{props.name}</div>;
      `,
      errors: [{ messageId: "noUseFunctionComponentTypeWithoutChildren" }],
    },
  ],
});
