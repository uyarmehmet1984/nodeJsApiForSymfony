// bookController.js
const Book = require('../models/bookmodels_mongo');

// GET: Tüm kitapları getir
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().exec();
    res.json(books);
  } catch (err) {
    res.status(500).send('Veritabanı hatası: ' + err.message);
  }
};

// GET: Belirli bir kitabı getir
exports.getBookById = (req, res) => {
  const bookId = req.params.id;

  Book.findById(bookId, (err, book) => {
    if (err) {
      res.status(500).send('Veritabanı hatası: ' + err.message);
    } else if (!book) {
      res.status(404).send('Kitap bulunamadı.');
    } else {
      res.json(book);
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

  const book = new Book(newBook);
  book.save((err, savedBook) => {
    if (err) {
      res.status(500).send('Veritabanı hatası: ' + err.message);
    } else {
      res.status(201).send('Kitap başarıyla eklendi. ID: ' + savedBook._id);
    }
  });
};

// PUT: Belirli bir kitabı güncelle
exports.updateBook = (req, res) => {
  const bookId = req.params.id;
  const updatedBook = req.body;

  Book.findByIdAndUpdate(bookId, updatedBook, { new: true }, (err, updatedBook) => {
    if (err) {
      res.status(500).send('Veritabanı hatası: ' + err.message);
    } else if (!updatedBook) {
      res.status(404).send('Kitap bulunamadı.');
    } else {
      res.send('Kitap başarıyla güncellendi.');
    }
  });
};

// DELETE: Belirli bir kitabı sil
exports.deleteBook = (req, res) => {
  const bookId = req.params.id;

  Book.findByIdAndDelete(bookId, (err, deletedBook) => {
    if (err) {
      res.status(500).send('Veritabanı hatası: ' + err.message);
    } else if (!deletedBook) {
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
  const pageSizeNumber = parseInt(pageSize) || 3;

  const options = {
    limit: pageSizeNumber,
    skip: (pageNumber - 1) * pageSizeNumber,
  };

  let query = {};

  // Yazar filtresi
  if (yazar) {
    query.yazar = yazar;
  }

  // Sıralama
  const sortOrder = sort === 'asc' ? 1 : -1;
  options.sort = { ad: sortOrder };

  Book.find(query, null, options, (err, books) => {
    if (err) {
      res.status(500).send('Veritabanı hatası: ' + err.message);
    } else {
      res.json(books);
    }
  });
};
