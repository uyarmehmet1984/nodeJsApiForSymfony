// bookmodels.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  ad: {
    type: String,
    required: true,
  },
  yazar: {
    type: String,
    required: true,
  },
  sayfa_sayisi: {
    type: Number,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
    unique: true,
  },
  sayi: {
    type: Number,
    required: true,
  },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
