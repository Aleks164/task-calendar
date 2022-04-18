import { renderTasks } from "./taskCreator/renderTasks";
import { Router } from "./taskCreator/router/router";
import { calendarRender } from "./temp_calendar/index";
import { aboutRender } from "./About/index";
import "./index.css";

const router = Router();

router.on("/", calendarRender);

router.on("/tasks", renderTasks);

router.on("/about", aboutRender);
