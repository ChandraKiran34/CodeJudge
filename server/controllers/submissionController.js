import Submission from "../models/Submission";

export const addSubmission = async (req, res) =>{
    try {
        const {userId, problemId} = req.params;
        const {submission}  = req.body; // contains language, code, verdict
        const submissionData = {
            ...submission, userId, problemId
        }

        const addSubmission = new Submission(submissionData);
        const savedSubmission  = await addSubmission.save();
        console.log("submission added successfully");
        res.status(201).json({success : true, message: "submission added successfully"})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success : false, message: "something went wrong"})
    }
}

export const getAllSubmissionsByUserProblemId = async (req, res) => {

    try {
        const {userId, problemId} = req.params;
        const submissions = await Submission.find({userId, problemId});
        res.status(200).json({success : true, submissions})
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success : false, message: "Error in fetching submissions"})
    }

}