import { isFunctionComponentType } from "../../../lib/util";
import { expect } from "chai";

describe("isFunctionComponentType", () => {
  it("when name is React Function Component's type, returns true", () => {
    const name = "FunctionComponent";

    const result = isFunctionComponentType(name);

    expect(result).to.equal(true);
  });

  it("when name is not React Function Component's type, returns false", () => {
    const name = "SomeType";

    const result = isFunctionComponentType(name);

    expect(result).to.equal(false);
  });
});
