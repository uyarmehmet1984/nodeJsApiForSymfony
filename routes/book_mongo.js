const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController_mongo');

// GET: Tüm kitapları getir
router.get('/books', bookController.getAllBooks);

// GET: Belirli bir kitabı getir
router.get('/books/:id', bookController.getBookById);

// POST: Yeni bir kitap ekle
router.post('/books', bookController.addBook);

// PUT: Belirli bir kitabı güncelle
router.put('/books/:id', bookController.updateBook);

// DELETE: Belirli bir kitabı sil
router.delete('/books/:id', bookController.deleteBook);

// GET: Kitapları sayfalı olarak getir
router.get('/books/paginated', bookController.getBooksPaginated);

module.exports = router;
