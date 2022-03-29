import { configureStore, combineReducers } from "@reduxjs/toolkit";
import taskReducer from "./reducers/taskSlicer";

const rootReducer = combineReducers({
  taskReducer
});

// export const setupStore = () => configureStore({
//   reducer: rootReducer
// });

export const setupStore = configureStore({
  reducer: taskReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
