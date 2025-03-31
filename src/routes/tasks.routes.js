import { Router } from "express";
import { authRequired } from "../Middlewares/validateToken.js";
import { getTask, getTasks, createTasks, updateTasks, deleteTasks } from "../controllers/tasks.controller.js";
import { validateSchema } from "../Middlewares/validator.middleware.js";
import { createTaskSchema } from "../Schemas/task.schema.js";

const router = Router();

// Rutas correctamente definidas
router.get("/", authRequired, getTasks);
router.get("/:id", authRequired, getTask);
router.post("/", authRequired, validateSchema(createTaskSchema), createTasks);
router.put("/:id", authRequired, updateTasks);
router.delete("/:id", authRequired, deleteTasks);

export default router;
