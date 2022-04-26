import { paramLinkCompiler } from "./paramLinkCompiler";

describe("paramLinkCompiler test", () => {
  it("paramLinkLoader should compiling string to expect object", () => {
    const incomingParam = `?fuzzySelect=description&fuzzyInput=testDescription&onlyDone=true`;
    const compiledString = paramLinkCompiler(incomingParam);
    expect(compiledString.fuzzySelect).toBe("description");
    expect(compiledString.fuzzyInput).toBe("testDescription");
    expect(compiledString.onlyDone).toBeTruthy();
  });
});
