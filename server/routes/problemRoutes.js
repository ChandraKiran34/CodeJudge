import express from "express";
import {
  addProblem,
  allProblems,
  getProblemById,
} from "../controllers/problemController.js";


import generateFile from "../generateFile.js";
import executeCpp from "../executeCpp.js";

const router = express.Router();

router.post("/addProblem", addProblem);

router.get("/allProblems", allProblems);

router.get("/getProblem/:id", getProblemById);

// router.post("/run", async (req, res) => {
//   const { language = "cpp", code } = req.body;
//   if (code === undefined) {
//     res.status(400).json({ success: false, message: "Code is required." });
//   }
//   try {
//     const filePath = await generateFile(language, code);
//     const output = await executeCpp(filePath);
//     console.log("ahuuu");
//     res.send({ filePath, output });
//   } catch (error) {
//     res.status(400).json({ success: false, message: "Error" + error.message });
//   }
// });

export default router;
