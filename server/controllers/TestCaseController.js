import AppError from "../Utils/AppError.js";
import TestCase from "../models/TestCase.js";

export const addTestCase = async (req, res) => {
  try {
    const { problemId } = req.params;
    const testCaseData = {...req.body, problemId};
    console.log(testCaseData);

    const newTestCase = new TestCase(testCaseData);
    const savedTestCase = await newTestCase.save();
    console.log("TestsCase added successfully");
    res.json({ success: true, savedTestCase });
  } catch (error) {
    return new AppError(`${error.message}`, 400);
  }
};


