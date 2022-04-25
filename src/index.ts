import { tasksMain } from "./pages/tasks_page/tasksMain";
import { Router } from "./router/router";
import { calendarRender } from "./pages/calendar_page/index";
import { aboutRender } from "./pages/about_page/index";
import "./index.css";

const router = Router();

if (location.pathname !== "/tasks") {
  console.log("wqeqwe");
}

router.on("/", calendarRender);

router.on("/tasks", tasksMain);

router.on("/about", aboutRender);
