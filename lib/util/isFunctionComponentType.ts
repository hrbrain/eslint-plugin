const FunctionalComponentTypes = ["FunctionComponent", "FC"];

export const isFunctionComponentType = (name: string) =>
  FunctionalComponentTypes.some((type) =>
    new RegExp(String.raw`^.*${type}$`, "u").test(name)
  );
