import mongoose from "mongoose";

const ProblemSchema = new mongoose.Schema(
  {
    statement: {
      type: String,
      required: [true, "problem Statement cannot be empty"],
    },
    problemDescription: {
      type: String,
      required: true,
      unique: true,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      lowercase: true,
      required: [
        true,
        "A problem Should have difficulty either Easy, Medium or Hard",
      ],
    },
    examples: [
      {
        input: {
          type: String,
          required: true,
        },
        output: {
          type: String,
          required: true,
        },
      },
    ],
    tags: [String],
    submissions: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Problem = mongoose.model("Problem", ProblemSchema);

export default Problem;
