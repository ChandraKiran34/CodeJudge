import mongoose from "mongoose";

const testCaseSchema = mongoose.Schema({
  testInput: {
    type: String,
    required: [true, "Input is required"],
  },
  testOutput: {
    type: String,
    required: [true, "Output is required"],
  },
  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Problem Id is required"],
    ref: "Problem",
    required: true,
  },
});

const TestCase = mongoose.model("TestCase", testCaseSchema);

export default TestCase;
