import AppError from "../Utils/AppError.js";
import Problem from "../models/Problem.js";

const addProblem = async (req, res) => {
  try {
    const newProblem = new Problem(req.body);
    const savedProblem = await newProblem.save();
    console.log("Problem added successfully");
    res.status(201).json({
      success: true,
      message: "Problem added successfully",
      problem: savedProblem,
    });
  } catch {
    console.log(error.message + "problem not added successfully");
    return new AppError(error.message, 400);
  }
};

const allProblems = async (req, res) => {
  try {
    const problems = await Problem.find().sort({ createdAt: -1 });
    if (!problems) {
      return new AppError("No problems are there", 400);
    }
    res.status(200).json({
      success: true,
      message: "problems fetched successfully",
      problems,
    });
  } catch (error) {
    console.log(error.message + "problems not fetched successfully");
    return new AppError(error.message, 400);
  }
};

const getProblemById = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return new AppError("Problem not found", 404);
    }
    res.status(200).json({ success: true, message : 'problem fetched successfully', problem });
  } catch (error) {
    console.log(error.message + "problem not fetched successfully");
    return new AppError(error.message, 400);
  }
};

const handleSubmit = () =>{
  const problemId = req.params;
  
}

export { addProblem, allProblems, getProblemById };
