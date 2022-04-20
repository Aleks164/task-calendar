import { renderTasks } from "./pages/tasks_page/renderTasks";
import { Router } from "./router/router";
import { calendarRender } from "./pages/calendar_page/index";
import { aboutRender } from "./pages/about_page/index";
import "./index.css";

const router = Router();

router.on("/", calendarRender);

router.on("/tasks", renderTasks);

router.on("/about", aboutRender);
