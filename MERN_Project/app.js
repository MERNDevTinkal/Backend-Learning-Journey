import express from "express";
import dotenv from 'dotenv';
import connectDB from "./DB/Database.js";
import userRouter from "./routes/userRouter.js";
import todoRouter from "./routes/todoRouter.js";
import bodyParser from "body-parser";
const app = express();

dotenv.config();

connectDB();

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/todo", todoRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});