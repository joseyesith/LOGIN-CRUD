import PDFDocument from "pdfkit";
import User from "../models/user.model.js";

export const generateUserReportPDF = async (req, res) => {
    try {
        const users = await User.find();

        if (!users.length) {
            return res.status(404).json({ message: "No hay usuarios registrados" });
        }

        res.setHeader("Content-Disposition", "attachment; filename=usuarios_reporte.pdf");
        res.setHeader("Content-Type", "application/pdf");

        const doc = new PDFDocument({ margin: 50 });
        doc.pipe(res);

        // Título del documento
        doc.fontSize(18).text("Reporte de Usuarios", { align: "center" });
        doc.moveDown(2);

        // Encabezados de la tabla
        const startX = 50;
        let y = doc.y; // Posición vertical

        doc.fontSize(12)
            .text("ID", startX, y, { width: 100 })
            .text("Username", startX + 110, y, { width: 120 })
            .text("Email", startX + 230, y, { width: 180 })
            .text("Rol", startX + 410, y, { width: 80 });

        doc.moveDown(0.5);
        doc.moveTo(startX, doc.y).lineTo(550, doc.y).stroke();
        doc.moveDown();

        // Datos de los usuarios
        users.forEach((user, index) => {
            y = doc.y;

            // Verificar si hay espacio suficiente, si no, crear una nueva página
            if (y > 700) {
                doc.addPage();
                y = 50; // Reiniciar posición vertical
            }

            doc.fontSize(10)
                .text(user._id.toString(), startX, y, { width: 100 })
                .text(user.username, startX + 110, y, { width: 120 })
                .text(user.email, startX + 230, y, { width: 180 })
                .text(user.role, startX + 410, y, { width: 80 });

            doc.moveDown();
        });

        doc.end();
    } catch (error) {
        res.status(500).json({ message: "Error al generar el PDF", error: error.message });
    }
};
