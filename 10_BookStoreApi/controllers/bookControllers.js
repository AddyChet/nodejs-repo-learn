import mongoose from "mongoose";
import { BookStore } from "../models/Book.js";

export const getAllBooks = async (req, res) => {
  try {
    const allBooks = await BookStore.find();
    if (allBooks?.length > 0) {
      return res.status(200).json({
        success: true,
        message: "List of all the Books",
        books: allBooks,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No Books Found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

export const getSingleBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await BookStore.findById(bookId);

    //the below is not working
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book with ID not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book with ID Found",
      book: book,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

export const addNewBook = async (req, res) => {
  try {
    const newBookFormData = req.body;
    if (Object.keys(newBookFormData).length === 0) {
      return res.status(400).json({ msg: "ERROR : Empty Null-Data Provided" });
    }
    const duplicatedBook = await BookStore.findOne({
      title: req.body.title,
      author: req.body.author,
    });
    if (duplicatedBook)
      return res.status(400).json({ msg: "Book Already Exists in Database" });
    const newlyCreatedBook = await BookStore.create(newBookFormData);
    if (!newlyCreatedBook)
      return res.status(400).json({ msg: "Book does not exist" });

    return res.status(201).json({
      msg: "Book created Successfully",
      success: true,
      data: newlyCreatedBook,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

export const updateTheBook = async (req, res) => {
  try {
    const { title, author, year } = req.body;
    const bookId = req.params.id;

    // Check if the provided ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Book ID format",
      });
    }

    // Ensure all required fields are present
    if (!title || !author || !year) {
      return res.status(400).json({
        success: false,
        message: "Please provide Title, Author, and Year Published",
      });
    }

    const updatedBook = await BookStore.findByIdAndUpdate(
      bookId,
      { title, author, year },
      { new: true, runValidators: true } // `new: true` returns the updated book, `runValidators: true` ensures Mongoose validates the data
    );

    // If no book is found with the given ID
    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: "Book with the given ID not found",
      });
    }

    // Success response
    return res.status(200).json({
      success: true,
      message: "Book updated successfully",
      updatedBook,
    });
  } catch (error) {
    console.error("Error updating book:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export const deleteTheBook = async (req, res) => {
  try {
    const bookId = req.params.id;

    //check if ID exists or not
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Book ID format",
      });
    }
    const deletedBook = await BookStore.findByIdAndDelete(bookId);
    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: "Book with ID not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      deletedBook: deletedBook,
    });
  } catch (error) {
    console.error("Error deleting book:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
