import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";

// COMPILER PART

import generateFile from "./generateFile.js";
import generateInputFile from "./generateInputFile.js";
import executeCpp from "./executeCpp.js";
import TestCase from "./models/TestCase.js"; // testcases model

const app = express();
import errorMiddleware from "./middleware/error.middleware.js";

// importing routes
import authRoutes from "./routes/authRoutes.js";
import problemRoutes from "./routes/problemRoutes.js";
import testCaseRoutes from "./routes/TestCaseRoutes.js";
import { isLoggedIn, verifyToken } from "./middleware/auth.middleware.js";

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
app.use("/testCase", testCaseRoutes);

// COMPILER PART

app.post("/api/run", isLoggedIn, async (req, res) => {
  const { language = "cpp", code, input } = req.body;
  if (code === undefined) {
    res.status(400).json({ success: false, message: "Code is required." });
  }
  try {
    const filePath = await generateFile(language, code);
    const inputPath = await generateInputFile(input);
    const output = await executeCpp(filePath, inputPath);
    res.json({ success : true, message: "code executed successfully" ,output });
  } catch (error) {
    console.log(error.message);
    if (!res.headersSent) {
      // Check if headers are already sent
      res.status(500).json({ error: error.message });
    }
  }
});

app.post("/api/submit", verifyToken, async (req, res) => {
  const { language = "cpp", code, problemId } = req.body;
  if (code === undefined || problemId === undefined) {
    res
      .status(400)
      .json({ success: false, message: "Code and problem ID are required." });
    return;
  }
  try {
    const testCases = await TestCase.find({ problemId });

    if (testCases.length === 0) {
      res
        .status(404)
        .json({
          success: false,
          message: "No test cases found for this problem.",
        });
      return;
    }

    const results = [];
    for (let testCase of testCases) {
      const filePath = await generateFile(language, code);
      const inputPath = await generateInputFile(testCase.testInput);
      const actualOutput = await executeCpp(filePath, inputPath);
      const expectedOutput = testCase.testOutput.trim(); // trim to avoid whitespace issues
      const passed = actualOutput.trim() === expectedOutput; // trim to avoid whitespace issues
      console.log(passed, actualOutput);

      results.push({
        input: testCase.testInput,
        expectedOutput,
        actualOutput: actualOutput.trim(), // trim to avoid whitespace issues
        passed,
      });
    }

    res.json({ success: true, results });
  } catch (error) {
    console.log(error.message);
    if (!res.headersSent) {
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
