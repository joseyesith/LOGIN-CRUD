import { Router } from "express";
import { login, register, logout, profile } from "../controllers/auth.controller.js";
import { authRequired } from "../Middlewares/validateToken.js";
import { validateSchema } from "../Middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../Schemas/auth.schema.js";
import { generateUserReportPDF } from '../controllers/reports.controller.js';

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.get("/profile", authRequired, profile); // Protegido con autenticación

router.get('/users/pdf', generateUserReportPDF);

export default router;
