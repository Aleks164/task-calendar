import { requestTaskFromFB } from "./requestTaskFromFB";
import { Crud } from "../../firebase_init/tasksCRUD";
import { TaskType } from "../../types/taskType";

jest.mock("../../firebase_init/tasksCRUD");

describe("requestTaskFromFB test", () => {
    beforeAll(() => {
        jest.useFakeTimers("modern");
        jest.setSystemTime(new Date(2022, 3, 22, 0, 0, 0).valueOf());
    });

    afterAll(() => {
        jest.useRealTimers();
    });
    it("requestTaskFromFB should return expected task when firebase can't be connected ", async () => {
        const spyGetTask = jest.spyOn(Crud.prototype, "getData").mockResolvedValue("some problem with request data")
        const expectedTask = [{ "date": "2022-04-22", "description": "Try again later", "id": 404, "status": "in progress", "title": "taskFromBase" }];

        expect(await requestTaskFromFB()).toStrictEqual(expectedTask);
        spyGetTask.mockClear();
    });
    it("requestTaskFromFB should return expected task when firebase can be connected", async () => {

        const fbData = { "200": { "date": "2022-04-22", "description": "Some task", "id": 200, "status": "in progress", "title": "taskFromBase" } as TaskType }
        const spyGetTask = jest.spyOn(Crud.prototype, "getData").mockResolvedValue(fbData);
        const expectedTask = [{ "date": "2022-04-22", "description": "Some task", "id": 200, "status": "in progress", "title": "taskFromBase" }];

        expect(await requestTaskFromFB()).toStrictEqual(expectedTask);
        spyGetTask.mockClear();
    });
});