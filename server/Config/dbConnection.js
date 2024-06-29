import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config()
mongoose.set('strictQuery', false);

const connectToDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URL);
    if(connection) {
        console.log(`Database connected : ${connection.host}`)
    }
  } catch (error) {
    console.log(`Mongodb not connected ${error}`);
    process.exit(1);
  }
}

export default connectToDB;


