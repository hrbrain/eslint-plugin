export = {
  extends: require.resolve("./base"),
  rules: {
    "@hrbrain/prefer-function-component-type": [
      "error",
      { prefer: "React.FC" },
    ],
    "@hrbrain/use-name-space-import": ["error", { modules: ["react"] }],
  },
};
