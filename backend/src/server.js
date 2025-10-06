import express from "express";
import noteRoutes from "./routes/noteRoutes.js";
import { connectDb } from "../config/db.js";
import dotenv from "dotenv";
import rateLimiter from "../middleware/rateLimiter.js";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
 // Middleware
 app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))
app.use(rateLimiter); // Apply rate limiting middleware
app.use(express.json());



app.use('/api/notes', noteRoutes);

    
    connectDb().then(() => { 
        app.listen(PORT, () => {
        console.log("Server is running on port " + PORT);
    });
}).catch((err) => {
    console.error("Failed to connect to the database", err);
});