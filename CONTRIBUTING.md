# How to contribute

Hello, we are hrbrain team.  
This library is designed for internal use by HRBrain, but contributions are always welcome.

## Setup

We use yarn for the package manager.

```bash
yarn
```

## Development

### Create a new rule

```bash
yarn gen:rule
```

### Create sandbox

Sandbox means environment that running ESLint as actual.

```bash
yarn gen:sandbox
```

Then, you can run ESLint.

```bash
yarn sandbox
```

## Sending PR

PR title must follow [Conventional Commits 1.0.0
](https://www.conventionalcommits.org/en/v1.0.0/).
ex) feat: add vue preset
