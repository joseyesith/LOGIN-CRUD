import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const authRequired = (req, res, next) => {
    const { token } = req.cookies;

    console.log("Token recibido:", token); // 🛠 Verifica si llega el token

    if (!token) {
        return res.status(401).json({ message: "No token, autorización denegada" });
    }

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Token inválido" });

        console.log("Usuario autenticado:", user); // 🛠 Verifica qué usuario se autentica

        req.user = user;  // Asignamos la información del usuario decodificada a req.user
        next();
    });
};
