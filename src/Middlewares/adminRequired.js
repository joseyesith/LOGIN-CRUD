// adminRequired.js

export const adminRequired = (req, res, next) => {
    // Verificamos si el usuario autenticado tiene el rol de "admin"
    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "Acceso denegado: Se requiere rol de administrador"
        });
    }

    // Si es un administrador, pasamos a la siguiente función
    next();
};
