import mongoose from "mongoose"


console.log(process.env.MONGO_URI);

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MONGODB successfully");
    } catch (error) {
        console.error("Error connecting to MONGODB", error);
        process.exit(1) // exit with failure
    }
}