const express = require("express")
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const { json } = require('express');
const booksData = require("./db.json")

// Middleware
app.use(cors());
app.use(express.json());

// Port
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Nature World Server is Running");
})

// GET all books
app.get('/books', (req, res) => {
  res.json(booksData.books);
});

// POST a new book
app.post('/books', (req, res) => {
    console.log(req,"post request")
  const newBook = req.body;
  newBook.id = booksData.books.length + 1;
  booksData.books.push(newBook);
  res.json(booksData.books);
});

// DELETE a book by ID
app.delete('/books/:id', (req, res) => {
    console.log()
  const bookId = parseInt(req.params.id);

  // Filter out the book with the specified ID
  booksData.books = booksData.books.filter(book => book.id !== bookId);

  res.json(booksData.books);
});

// PUT (or PATCH) to edit a book by ID
app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const updatedBook = req.body;

  // Find the index of the book with the specified ID
  const index = booksData.books.findIndex(book => book.id === bookId);

  if (index !== -1) {
    // Update the book if found
    booksData.books[index] = { ...booksData.books[index], ...updatedBook };
  }

  res.json(booksData.books);
});

app.get('/', (req, res) => {
    res.send("Nature World Server is Running");
})