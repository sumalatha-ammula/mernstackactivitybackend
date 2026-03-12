import mongoose from "mongoose"


export const connectDB = async()=>{
    try{
     await mongoose.connect(process.env.MONGO_URI)
     console.log("Databse connected succesfully")
    }
    catch(err){
        console.err("Errror in connecting database",err);

    }
}