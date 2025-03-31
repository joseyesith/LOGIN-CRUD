import Task from "../models/task.model.js";

// Obtener todas las reservas
export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.json(tasks);
    } catch (error) {
        console.error("Error al obtener reservas:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};

// Crear una nueva reserva
export const createTasks = async (req, res) => {
    try {
        const { date, time, name, email, phone } = req.body;

        if (!date || !time || !name || !email || !phone) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        const newTask = new Task({
            date,
            time,
            name,
            email,
            phone,
            user: req.user.id,
        });

        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        console.error("Error al crear la reserva:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};

// Obtener una reserva por ID
export const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Reserva no encontrada" });

        res.json(task);
    } catch (error) {
        console.error("Error al obtener la reserva:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};

// Actualizar una reserva
export const updateTasks = async (req, res) => {
    try {
        const { date, time, name, email, phone } = req.body;

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { date, time, name, email, phone },
            { new: true }
        );

        if (!updatedTask) return res.status(404).json({ message: "Reserva no encontrada" });

        res.json(updatedTask);
    } catch (error) {
        console.error("Error al actualizar la reserva:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};

// Eliminar una reserva
export const deleteTasks = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);

        if (!deletedTask) return res.status(404).json({ message: "Reserva no encontrada" });

        res.sendStatus(204);
    } catch (error) {
        console.error("Error al eliminar la reserva:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};
