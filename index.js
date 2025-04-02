import dotenv from "dotenv";
import app from "./src/app.js";
import { connectDb } from "./src/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        await connectDb();
        console.log(" Database connected successfully");

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error(" Error connecting to the database:", error);
        process.exit(1);
    }
}

startServer();

