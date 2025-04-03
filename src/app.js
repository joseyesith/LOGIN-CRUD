import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/tasks.routes.js";
import bookingRoutes from "./routes/booking.routes.js"; 
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(cookieParser());  // 🔹 Asegurar que las cookies se pueden leer antes de usarlas
app.use(express.json());
app.use(morgan("dev"));

// 🔹 Configuración mejorada de CORS
app.use(
  cors({
    origin: "http://localhost:5173", // 🔹 Asegurar que el frontend está permitido
    credentials: true, // 🔹 Permitir el envío de cookies
    allowedHeaders: ["Content-Type", "Authorization"], // 🔹 Asegurar que los headers necesarios están permitidos
  })
);

// 🔹 Middleware de autenticación mejorado
const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.token; // 🔹 Verificar si la cookie de token existe
        if (!token) {
            return res.status(403).json({ message: "No autorizado. Inicia sesión." });
        }

        // 🔹 Verificar token JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (error) {
        console.error("Error de autenticación:", error.message);
        return res.status(403).json({ message: "Token inválido o expirado." });
    }
};

// 🔹 Ruta para verificar autenticación
app.get("/api/auth/check-auth", (req, res) => {
    try {
        const token = req.cookies.token; 
        if (!token) {
            return res.status(401).json({ authenticated: false, message: "No autenticado" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ authenticated: true, user: decoded });
    } catch (error) {
        res.status(401).json({ authenticated: false, message: "Token inválido o expirado" });
    }
});

// 🔹 Proteger rutas de tareas y reservas
app.use("/api/auth", authRoutes);
app.use("/api/tasks", verifyToken, taskRoutes);
app.use("/api/bookings", verifyToken, bookingRoutes);

// 🔹 Verificar si la API está corriendo
app.get("/", (req, res) => {
    res.send("API funcionando correctamente!");
});

// 🔹 Middleware para rutas no encontradas
app.use((req, res) => {
    console.log(`Ruta no encontrada: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ message: "Ruta no encontrada" });
});

export default app;
