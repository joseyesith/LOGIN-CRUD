import axios from "./axios.js";

// Obtener todas las tareas
export const getTasksRequest = () => axios.get('/tasks');

// Obtener una tarea por ID
export const getTaskRequest = (id) => axios.get(`/tasks/${id}`);

// Crear una nueva tarea
export const createTaskRequest = (task) => axios.post('/tasks', task);

// Actualizar una tarea existente
export const updateTaskRequest = (id, task) => 
  axios.put(`/tasks/${id}`, task);

// Eliminar una tarea
export const deleteTaskRequest = (id) => axios.delete(`/tasks/${id}`);
