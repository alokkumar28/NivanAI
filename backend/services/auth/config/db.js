import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database Connection Successful");
    } catch (error) {
        console.log(`Database Connection Error: ${error}`);
    }
};
export default connectDb;