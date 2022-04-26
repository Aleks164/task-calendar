import { tasksMain } from "./pages/tasks_page/index";
import { Router } from "./router/router";
import { calendarRender } from "./pages/calendar_page/index";
import { aboutRender } from "./pages/about_page/index";
import "./index.css";

calendarRender();

const router = Router();

router.on("/", calendarRender);

router.on("/tasks", tasksMain);

router.on("/about", aboutRender);
