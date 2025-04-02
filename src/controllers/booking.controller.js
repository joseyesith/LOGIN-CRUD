import Booking from "../models/booking.model.js";

export const createBooking = async (req, res) => {
    try {
        const { date, timeSlot } = req.body;
        const userId = req.user.id; // El usuario autenticado hace la reserva

        const newBooking = new Booking({ user: userId, date, timeSlot });
        await newBooking.save();

        res.status(201).json({ message: "Reserva creada con éxito", booking: newBooking });
    } catch (error) {
        res.status(500).json({ message: "Error al crear la reserva", error: error.message });
    }
};

export const getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener reservas", error: error.message });
    }
};
