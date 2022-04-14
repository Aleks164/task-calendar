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
      title: "test title",
    };
  let testCrud: CRUDType;
  beforeEach(() => {
    testCrud = new Crud();
  });
  afterAll(() => {
    (database as unknown as db).offline();
  });
  it("should Get expected Item by color", async () => {
    expect(await testCrud.createData(testTasks)).toBe(testTasks); // dell
    // expect(await testCrud.getData(1649766206618)).toStrictEqual(red);
  });
  // it("should create expected Item by color", async () => {
  //   // expect(await testCrud.getData(2)).toBe("object with id=2 not found");
  //   expect(await testCrud.createData(black)).toBe(black);
  //   expect(await testCrud.getData(2)).toStrictEqual(black);
  // });
  // it("should delete expected Item by color", async () => {
  //   expect(await testCrud.getData(2)).toStrictEqual(black);
  //   expect(await testCrud.deleteData(2)).toBe(null);
  //   expect(await testCrud.getData(2)).toBe("object with id=2 not found");
  // });
  it("should update expected Item by color", async () => {
    const updetedRed = { ...testTasks, status: "done" };
    // expect(await testCrud.updateData(updetedRed)).toBe(updetedRed);
    // expect(await testCrud.getData(1)).toStrictEqual(updetedRed);
    // expect(await testCrud.updateData(red)).toBe(red);
    // expect(await testCrud.getData(1)).toStrictEqual(red);
  });
});
