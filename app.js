const express = require('express');
const port = 4000;
const books = require('./books');

const app = express();

app.use(express.json());
app.use('/v1/books', books);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
