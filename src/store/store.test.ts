import { TaskType } from "../types/taskType";
import { taskSlice } from "./reducers/taskSlicer";
import { setupStore } from "./store";

describe("curDate test", () => {
  it("setupStore should work", () => {
    const newTask = {
      id: 123,
      title: "test title",
      description: "test description",
      date: "2323131",
      status: "in progress",
    } as TaskType;
    expect(setupStore.getState()).toStrictEqual({
      error: "",
      isLoading: false,
      tasks: [],
    });

    setupStore.dispatch(taskSlice.actions.addTask(newTask as TaskType));
    expect(setupStore.getState()).toStrictEqual({
      error: "",
      isLoading: false,
      tasks: [newTask],
    });

    const upDateigTask = { ...newTask, description: "new description" };
    setupStore.dispatch(taskSlice.actions.upDateTask(upDateigTask as TaskType));
    expect(setupStore.getState()).toStrictEqual({
      error: "",
      isLoading: false,
      tasks: [upDateigTask],
    });

    const tugleStatusItem = { ...newTask, status: "done" };
    setupStore.dispatch(
      taskSlice.actions.upDateTask(tugleStatusItem as TaskType)
    );
    expect(setupStore.getState()).toStrictEqual({
      error: "",
      isLoading: false,
      tasks: [tugleStatusItem],
    });

    setupStore.dispatch(taskSlice.actions.dellTask(123));
    expect(setupStore.getState()).toStrictEqual({
      error: "",
      isLoading: false,
      tasks: [],
    });

    setupStore.dispatch(taskSlice.actions.dateFromFBisLoaded([newTask]));
    expect(setupStore.getState()).toStrictEqual({
      error: "",
      isLoading: true,
      tasks: [newTask],
    });
  });
});
