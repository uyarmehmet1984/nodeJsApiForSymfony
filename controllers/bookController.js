// bookController.js
const bookModel = require('../models/bookModel');

// GET: Tüm kitapları getir
exports.getAllBooks = (req, res) => {
  bookModel.getAllBooks((err, results) => {
    if (err) {
      res.status(500).send('Veritabanı hatası: ' + err.message);
    } else {
      res.json(results);
    }
  });
};

// GET: Belirli bir kitabı getir
exports.getBookById = (req, res) => {
  const bookId = req.params.id;

  bookModel.getBookById(bookId, (err, result) => {
    if (err) {
      res.status(500).send('Veritabanı hatası: ' + err.message);
    } else if (!result.length) {
      res.status(404).send('Kitap bulunamadı.');
    } else {
      res.json(result[0]);
    }
  });
};

// POST: Yeni bir kitap ekle
exports.addBook = (req, res) => {
  const newBook = req.body;

  // Veri doğrulama
  if (!newBook.ad || !newBook.yazar || !newBook.sayfa_sayisi || !newBook.isbn || !newBook.sayi) {
    return res.status(400).send('Eksik bilgi, lütfen tüm alanları doldurun.');
  }

  bookModel.addBook(newBook, (err, results) => {
    if (err) {
      res.status(500).send('Veritabanı hatası: ' + err.message);
    } else {
      res.status(201).send('Kitap başarıyla eklendi. ID: ' + results.insertId);
    }
  });
};

// PUT: Belirli bir kitabı güncelle
exports.updateBook = (req, res) => {
  const bookId = req.params.id;
  const updatedBook = req.body;

  bookModel.updateBook(bookId, updatedBook, (err, results) => {
    if (err) {
      res.status(500).send('Veritabanı hatası: ' + err.message);
    } else if (results.affectedRows === 0) {
      res.status(404).send('Kitap bulunamadı.');
    } else {
      res.send('Kitap başarıyla güncellendi.');
    }
  });
};

// DELETE: Belirli bir kitabı sil
exports.deleteBook = (req, res) => {
  const bookId = req.params.id;

  bookModel.deleteBook(bookId, (err, results) => {
    if (err) {
      res.status(500).send('Veritabanı hatası: ' + err.message);
    } else if (results.affectedRows === 0) {
      res.status(404).send('Kitap bulunamadı.');
    } else {
      res.send('Kitap başarıyla silindi.');
    }
  });
};

// GET: Kitapları sayfalı olarak getir
exports.getBooksPaginated = (req, res) => {
  const { page, pageSize, sort, yazar } = req.query;

  // Sayfa numarası ve sayfa boyutunu kontrol et
  const pageNumber = parseInt(page) || 1;
  const pageSizeNumber = parseInt(pageSize) || 10;

  bookModel.getBooksPaginated(pageNumber, pageSizeNumber, sort, yazar, (err, results) => {
    if (err) {
      res.status(500).send('Veritabanı hatası: ' + err.message);
    } else {
      res.json(results);
    }
  });
};
