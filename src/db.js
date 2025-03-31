import mongoose from 'mongoose';

const MONGODB_URI = "mongodb://localhost:27017/mern";

const connectDb = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ DB is connected");
    } catch (error) {
        console.error("❌ Error connecting to the database:", error);
        process.exit(1); // Detener la aplicación en caso de fallo
    }
};

export { connectDb };





