import mongoose from "mongoose";

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            dbName : "Authentication"
        })
        console.log("MongoDB connection established successfully!")
    } catch (error) {
        console.error("MongoDb connection Failed")
        process.exit(1)
    }
}

export default connectToDB;