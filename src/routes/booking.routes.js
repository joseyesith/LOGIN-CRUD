import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { createBooking, getUserBookings } from "../controllers/booking.controller.js";

const router = Router();

router.post("/", authRequired, createBooking); // Crear una reserva
router.get("/", authRequired, getUserBookings); // Obtener las reservas del usuario

export default router;
