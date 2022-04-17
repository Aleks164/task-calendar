import { Crud, CRUDType } from "./CRUD";
import { offline } from "./memory/initialFB";
import { TaskType } from "../taskCreator/types/taskType";

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
    offline();
  });
  it("hould create expected Item", async () => {
    expect(await testCrud.createData(testTasks)).toBe(testTasks);
    const fbEl = await testCrud.getData() as TaskType[];
    expect(fbEl["1649766206618"]).toStrictEqual(testTasks);
  });
  it("should update and delete expected Item by color", async () => {
    const updetedRed = { ...testTasks, status: "done" } as TaskType;
    expect(await testCrud.updateData(updetedRed)).toBe(updetedRed);
    let fbEl = await testCrud.getData() as TaskType[];
    expect(fbEl["1649766206618"]).toStrictEqual(updetedRed);
   await testCrud.deleteData(1649766206618);
    fbEl = await testCrud.getData() as TaskType[];
    console.log(fbEl)
    expect(fbEl["1649766206618"]).toBe(undefined);
  });
});
