import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true, "Book title is required"],
        //removes any whitespaces
        trim : true,
        maxLength : [100, "Book Title cannot be more than 100 characters"]
    }, 
    author: {
        type : String,
        required : [true, "Author name is required"],
        trim : true,
    },
    year : {
        type : Number,
        required : [true, "Publication date is required"],
        min : [1000, "Year must be at least 1000"],
        max : [new Date().getFullYear(), "Year has to be current year"]
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
})

export const BookStore = mongoose.model("Book", bookSchema)