import mongoose from "mongoose"


export const connectToDB = async (req, res) => {
    try {
        await mongoose.connect("mongodb+srv://adarshbhandari1002:adarshbhandari10024@bookstore.eczzy.mongodb.net/?retryWrites=true&w=majority&appName=bookstore", {
            dbName : "BookStoreAPI"
        })

        console.log('Database Connected')
    } catch (error) {
        console.log("Failed to Connect : ", error)
        process.exit(1)
    }
}