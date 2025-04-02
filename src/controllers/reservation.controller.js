import Reservation from "../models/reservation.model.js";

// 📌 Crear una nueva reserva
export const createReservation = async (req, res) => {
  try {
    const { studio, date, startTime, endTime } = req.body;
    const userId = req.user.id; // Obtiene el ID del usuario autenticado

    const newReservation = new Reservation({
      user: userId,
      studio,
      date,
      startTime,
      endTime,
      status: "pending",
    });

    await newReservation.save();
    res.status(201).json({ message: "Reserva creada exitosamente", newReservation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Obtener todas las reservas
export const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate("user", "username email");
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Obtener una reserva por ID
export const getReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id).populate("user", "username email");
    if (!reservation) return res.status(404).json({ message: "Reserva no encontrada" });
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Actualizar una reserva
export const updateReservation = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedReservation = await Reservation.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!updatedReservation) return res.status(404).json({ message: "Reserva no encontrada" });
    res.json(updatedReservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Eliminar una reserva
export const deleteReservation = async (req, res) => {
  try {
    const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!deletedReservation) return res.status(404).json({ message: "Reserva no encontrada" });
    res.json({ message: "Reserva eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
