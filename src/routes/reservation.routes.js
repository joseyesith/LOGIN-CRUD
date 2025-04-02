import { Router } from "express";
import { authRequired } from "../Middlewares/validateToken.js";
import {
  createReservation,
  getReservations,
  getReservation,
  updateReservation,
  deleteReservation
} from "../controllers/reservation.controller.js";

const router = Router();

router.post("/", authRequired, createReservation); // Crear una reserva
router.get("/", authRequired, getReservations); // Obtener todas las reservas
router.get("/:id", authRequired, getReservation); // Obtener una reserva por ID
router.put("/:id", authRequired, updateReservation); // Actualizar una reserva
router.delete("/:id", authRequired, deleteReservation); // Eliminar una reserva

export default router;
