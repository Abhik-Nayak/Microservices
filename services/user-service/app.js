import cookieParser from "cookie-parser";
import {configDotenv } from "dotenv";
import express from "express";
import connect from "./db/db.js";
import userRoute from "./routes/user.route.js";

const app = express();

configDotenv();
connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/user', userRoute);

export default app;     