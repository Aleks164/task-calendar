import { renderTasks } from "./renderTasks";
import { Router } from "./router/router";
import {calendarRender} from "../temp_calendar/index"

const router = Router();

router.on("/tasks", renderTasks);

router.on("/", calendarRender);