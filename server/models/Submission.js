import mongoose from 'mongoose';

const submissionSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    problemId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem',
        required: true
    },
    language :{
        type: String,
        required: [true, "language is required"]
    },
    code :{
        type: String,
        required : ["Code is required"]
    },
    verdict :{
        type: String,  
        enum: ["ACCEPTED", "WRONG ANSWER", "ERROR"],
        required: [true, "You should provide the verdict"],
    }   
},{timestamps : true})

const Submission = mongoose.model("Submission");
export default Submission;