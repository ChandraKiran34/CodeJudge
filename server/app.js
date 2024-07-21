import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";

// COMPILER PART

import generateFile from "./generateFile.js";
import executeCpp from "./executeCpp.js";

const app = express();
import errorMiddleware from "./middleware/error.middleware.js";

// importing routes
import authRoutes from "./routes/authRoutes.js";
import problemRoutes from "./routes/problemRoutes.js";

// Middlewares
dotenv.config();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // your frontend URL
    credentials: true, // Allow credentials
  })
);

app.use(cookieParser());
app.use(morgan("dev"));

// server status checking route

app.get("/ping", (req, res) => {
  res.send("Pong");
});

// Routes
app.use("/auth", authRoutes);

// COMPILER PART

app.post("/api/run", async (req, res) => {
  const { language = "cpp", code } = req.body;
  if (code === undefined) {
    res.status(400).json({ success: false, message: "Code is required." });
  }
  try {
    const filePath = await generateFile(language, code);
    const inputPath = await generateInputFile(input);
    const output = await executeCpp(filePath);
    res.json({ output });
  } catch (error) {
    console.log(error.message);
    if (!res.headersSent) {
      // Check if headers are already sent
      res.status(500).json({ error: error.message });
    }
  }
});

app.use("/api", problemRoutes);
app.all("*", (req, res) => {
  res.status(404).send("OOPS!!! 404 Page Not Found");
});

app.use(errorMiddleware);
export default app;
