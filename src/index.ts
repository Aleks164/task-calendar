import { Router } from "./routing/router";
import {taskList} from "./app";
import {calendarLoader} from "./calendar/index"
import "./styles.css";

const router = Router();

router.on(
  "/",
  calendarLoader(), // onEnter 
);

router.on(
"/tasks",
  taskList() // onEnter
  );
  
// router.on(
//   "/about",
//   createAsincRender("you switched to /about", 1500), // onEnter
//   createAsincRender("you have left /about", 1500, true), // onLeave
//   createAsincRender("you going to /about", 1500) // onBeforeEnter
// );
