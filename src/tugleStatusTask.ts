import { taskSlice } from "./store/reducers/taskSlicer";
import { setupStore } from "./store/store";
import { inputCliner } from "./crudTask";
import { TaskType } from "./types/taskType";

export function tugleStatusTask(id: number) {
  const taskElList = setupStore.getState();
  const tugleStatusEl = taskElList.tasks.find((el) => el.id === id);
  const toglStatus = tugleStatusEl?.status === "done" ? "in progress" : "done";

  const updatedTask = { ...tugleStatusEl, status: toglStatus } as TaskType;

  setupStore.dispatch(taskSlice.actions.upDateTask(updatedTask));

  inputCliner();
}
