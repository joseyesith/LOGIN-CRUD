import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/tasks.routes.js";
import bookingRoutes from "./routes/booking.routes.js"; // Importar rutas de reservas

const app = express();

// Configurar CORS
app.use(cors({
    origin: "http://localhost:5173", // Cambia esto si tu frontend está en otro lugar
    credentials: true
}));

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// Registrar las rutas correctamente
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/bookings", bookingRoutes); // Agregar rutas de reservas

// Ruta base para verificar si la API está funcionando
app.get("/", (req, res) => {
    res.send(" API funcionando correctamente!");
});

// Middleware para rutas no encontradas
app.use((req, res) => {
    console.log(` Ruta no encontrada: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ message: " Ruta no encontrada" });
});

export default app;
