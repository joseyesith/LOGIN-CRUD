import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Relación con usuario
        date: { type: Date, required: true },
        timeSlot: { type: String, required: true }, // Franja horaria (ej. "10:00 AM - 12:00 PM")
        status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
    },
    { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
