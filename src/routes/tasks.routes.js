import { Router } from "express";  // Asegúrate de importar Router
import { authRequired } from "../Middlewares/validateToken.js"; // Middleware de autenticación
import { adminRequired } from "../Middlewares/adminRequired.js";  // Middleware de administración
import { getTask, getTasks, createTasks, updateTasks, deleteTasks } from "../controllers/tasks.controller.js"; 
import { validateSchema } from "../Middlewares/validator.middleware.js";  // Middleware de validación
import { createTaskSchema } from "../Schemas/task.schema.js";  // Esquema de validación para crear tareas

const router = Router();

// Rutas correctamente definidas
router.get("/", authRequired, getTasks);  // Solo usuarios autenticados pueden obtener las tareas
router.get("/:id", authRequired, getTask);  // Solo usuarios autenticados pueden obtener una tarea específica

// Solo admin puede crear tareas
router.post("/", authRequired, adminRequired, validateSchema(createTaskSchema), createTasks);

// Solo admin puede actualizar tareas
router.put("/:id", authRequired, adminRequired, updateTasks);

// Solo admin puede eliminar tareas
router.delete("/:id", authRequired, adminRequired, deleteTasks);

export default router;
