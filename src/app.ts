import { useAppSelector, useAppDispatch } from "./hooks/redux";
import { taskSlice } from "./store/reducers/taskSlicer";
import { setupStore } from "./store/store"

// function App() {
//   const { tasks } = useAppSelector((state) => state.taskReducer);
//   const { addTask } = taskSlice.actions;
//   // const dispatch = useAppDispatch();


//   console.log(tasks, addTask)
//   dispatch(addTask({
//     id: 1,
//     title: "123",
//     description: "332",
//     status: "in progress"
//   }))
//   root.innerHTML = tasks.toString();

// }
let root = document.getElementById("root");
let but = document.getElementById("but");

but?.addEventListener("click", () => {
  console.log("22")
  setupStore.dispatch(taskSlice.actions.addTask({
    id: 1,
    title: "123",
    description: "332",
    status: "in progress"
  }))
  root.innerHTML = JSON.stringify(setupStore.getState());
})
