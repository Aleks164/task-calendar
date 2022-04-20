import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskType, TaskState } from "../../types/taskType";

const initialState: TaskState = {
  tasks: [],
  isLoading: false,
  error: "",
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
    dateFromFBisLoaded: (state, action: PayloadAction<TaskType[]>) => {
      state.tasks = action.payload;
      state.isLoading = true;
    },
  },
});
export default taskSlice.reducer;
