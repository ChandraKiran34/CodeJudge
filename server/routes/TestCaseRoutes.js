import express from "express";
import { addTestCase } from "../controllers/TestCaseController.js";

const router = express.Router();

router.post('/addTestCase/:problemId', addTestCase);


export default router;
