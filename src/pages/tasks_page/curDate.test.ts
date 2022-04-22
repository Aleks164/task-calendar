import { curDate } from "./curDate";

describe("curDate test", () => {
  beforeAll(() => {
    jest.useFakeTimers("modern");
    jest.setSystemTime(new Date(2022, 3, 1, 0, 0, 0).valueOf());
  });

  afterAll(() => {
    jest.useRealTimers();
  });
  it("curDate should return current date in necessary format", () => {
    expect(curDate()).toBe("2022-04-01");
  });
});
