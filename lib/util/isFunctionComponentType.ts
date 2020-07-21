const FunctionComponentTypes = ["FunctionComponent", "FC"];

export const isFunctionComponentType = (name: string) =>
  FunctionComponentTypes.some((type) =>
    new RegExp(String.raw`^.*${type}$`, "u").test(name)
  );
