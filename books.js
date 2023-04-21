const express = require('express');
const router = express.Router();
const books = require('./books.json');

// Get all the books
router.get('/books', (req, res) => {
  console.log('Welcome to the book API');
  res.send(books);
});

router.get('/', (req, res) => {
  res.send('Welcome to the book API');
});

// Get a specific book
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const book = books.find((ele) => ele.id === parseInt(id));
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: `Book with id #${id} not found` });
  }
});

router.post('/books', (req, res) => {
  const body = req.body;
  if (!body.id || !body.name || !body.author) {
    res.status(400).json({ message: 'Please provide id, name, and author for the book' });
  } else {
    books.push(body);
    res.json({ message: 'The book has been added' });
  }
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const index = books.findIndex((book) => book.id === parseInt(id));
  if (index !== -1) {
    books[index] = body;
    res.json({ message: `The book with ID ${id} has been updated` });
  } else {
    res.status(404).json({ message: `Book with id #${id} not found` });
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = books.findIndex((book) => book.id === parseInt(id));
  if (index !== -1) {
    books.splice(index, 1);
    res.json({ message: `Book with id #${id} has been deleted` });
  } else {
    res.status(404).json({ message: `Book with id #${id} not found` });
  }
});

module.exports = router;
