import express from "express";
import dotenv from 'dotenv';
import connectDB from "./DB/Database.js";

const app = express();

dotenv.config();

connectDB();

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});