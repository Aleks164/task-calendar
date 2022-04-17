import { Crud, CRUDType } from "./CRUD";
import { database } from "./memory/initialFB";
import { TaskType } from "../taskCreator/types/taskType";

type db = {
  offline: () => void;
};

// eslint-disable-next-line jest/no-disabled-tests
describe.skip("CRUD", () => {
  const testTasks: TaskType = {
    date: "2022-04-12",
    description: "test descripton",
    id: 1649766206618,
    status: "in progress",
    title: "test title"
  };
  let testCrud: CRUDType;
  beforeEach(() => {
    testCrud = new Crud();
  });
  afterAll(() => {
    ((database as unknown) as db).offline();
  });
  it("hould create expected Item", async () => {
    expect(await testCrud.createData(testTasks)).toBe(testTasks);
    expect(
      await testCrud.getData().filter((el) => el.id === 1649766206618)
    ).toStrictEqual(testTasks);
  });
  it("should update and delete expected Item by color", async () => {
    const updetedRed = { ...testTasks, status: "done" };
    expect(await testCrud.updateData(updetedRed)).toBe(updetedRed);
    expect(
      await testCrud.getData().filter((el) => el.id === 1649766206618)
    ).toStrictEqual(updetedRed);
    expect(await testCrud.deleteData(1649766206618)).toBe(null);
    expect(
      await testCrud.getData().filter((el) => el.id === 1649766206618)
    ).toBe(null);
  });
});
