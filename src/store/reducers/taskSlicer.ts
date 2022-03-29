import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskType } from "../../types/taskType";

interface TaskState {
  tasks: TaskType[];
  isLoading: boolean;
  error: string;
}

const initialState: TaskState = {
  tasks: [{
    id: 2,
    title: "22223",
    description: "3322222",
    status: "in progress"
  }],
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
    // dellTask(state, action: PayloadAction<number>) {
    //   state.tasks.filter((task) => task.id !== action.payload)
    // },
    // upDateTask(state, action: PayloadAction<TaskType>) {
    //   state.tasks.filter((task) => task.id !== action.payload.id);
    //   state.tasks.push(action.payload);
    // },
    // filterTaskByStatus(state, action:PayloadAction<TaskType["status"]>){
    //   let result = state.tasks.filter((task)=>task.status!==action.payload);
    //   return result;
    // }
  }
});
export default taskSlice.reducer;
