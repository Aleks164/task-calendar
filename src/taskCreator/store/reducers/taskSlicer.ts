import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskType, TaskState } from "../../types/taskType";

const initialState: TaskState = {
  tasks: [
    {
      id: 1,
      title: "ToDo Tasklist",
      description: "Tasklist done",
      date: "2022-03-31",
      status: "done"
    }
  ],
  isLoading: false,
  error: ""
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<TaskType>) => {
      state.tasks.push(action.payload);
    },
    dellTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      state.tasks = state.tasks.sort((a, b) => a.id - b.id);
    },
    upDateTask: (state, action: PayloadAction<TaskType>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
      state.tasks.push(action.payload);
      state.tasks = state.tasks.sort((a, b) => a.id - b.id);
    },
    tugleStatus: (state, action: PayloadAction<TaskType>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
      state.tasks.push(action.payload);
      state.tasks = state.tasks.sort((a, b) => a.id - b.id);
    },
  }
});
export default taskSlice.reducer;
