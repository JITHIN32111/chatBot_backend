import { Long } from "mongodb";
import mongoose from "mongoose";
export const dbConnection = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).then((res)=>{
      console.log("sucess");
      })
    } catch (error) {
      console.error('Error connecting to the database:', error);
      process.exit(1);
    }
  };
  