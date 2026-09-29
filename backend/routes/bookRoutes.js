const express = require("express");
const Book = require("../models/Book");

const router = express.Router();


// =========================
// GET ALL BOOKS
// =========================

router.get("/books", async (req, res) => {

  try {

    const books = await Book.find();

    res.json(books);

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch books",
      error: error.message
    });

  }

});


// =========================
// ADD BOOK
// =========================

router.post("/books", async (req, res) => {

  try {

    const {
      title,
      author,
      category,
      availability
    } = req.body;


    if (
      !title ||
      !author ||
      !category
    ) {

      return res.status(400).json({
        message: "Please fill all fields"
      });

    }


    const newBook = new Book({

      title,
      author,
      category,

      availability:
        availability || "Available"

    });


    const savedBook =
      await newBook.save();


    res.status(201).json({
      message: "Book added successfully",
      book: savedBook
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to add book",
      error: error.message
    });

  }

});


// =========================
// UPDATE BOOK
// =========================

router.put("/books/:id", async (req, res) => {

  try {

    const updatedBook =
      await Book.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true
        }
      );


    if (!updatedBook) {

      return res.status(404).json({
        message: "Book not found"
      });

    }


    res.json({
      message: "Book updated successfully",
      book: updatedBook
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to update book",
      error: error.message
    });

  }

});


// =========================
// DELETE BOOK
// =========================

router.delete("/books/:id", async (req, res) => {

  try {

    const deletedBook =
      await Book.findByIdAndDelete(
        req.params.id
      );


    if (!deletedBook) {

      return res.status(404).json({
        message: "Book not found"
      });

    }


    res.json({
      message: "Book deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to delete book",
      error: error.message
    });

  }

});


module.exports = router;