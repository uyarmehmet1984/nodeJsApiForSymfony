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
exports.getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;

    // MongoDB'den belirli bir kitabı çekme
    const book = await Book.findById(bookId);

    if (!book) {
      res.status(404).send('Kitap bulunamadı.');
    } else {
      res.json(book);
    }
  } catch (err) {
    res.status(500).send('Veritabanı hatası: ' + err.message);
  }
};


// POST: Yeni bir kitap ekle
exports.addBook = async (req, res) => {
  try {
    const newBook = req.body;

    // Veri doğrulama
    if (!newBook.ad || !newBook.yazar || !newBook.sayfa_sayisi || !newBook.isbn || !newBook.sayi) {
      return res.status(400).send('Eksik bilgi, lütfen tüm alanları doldurun.');
    }

    const book = new Book(newBook);
    const savedBook = await book.save();

    res.status(201).send('Kitap başarıyla eklendi. ID: ' + savedBook._id);
  } catch (err) {
    res.status(500).send('Veritabanı hatası: ' + err.message);
  }
};


// PUT: Belirli bir kitabı güncelle
exports.updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const updatedBook = req.body;

    const book = await Book.findByIdAndUpdate(bookId, updatedBook, { new: true });

    if (!book) {
      res.status(404).send('Kitap bulunamadı.');
    } else {
      res.send('Kitap başarıyla güncellendi.');
    }
  } catch (err) {
    res.status(500).send('Veritabanı hatası: ' + err.message);
  }
};


// DELETE: Belirli bir kitabı sil
exports.deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;

    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      res.status(404).send('Kitap bulunamadı.');
    } else {
      res.send('Kitap başarıyla silindi.');
    }
  } catch (err) {
    res.status(500).send('Veritabanı hatası: ' + err.message);
  }
};


// GET: Kitapları sayfalı olarak getir
exports.getBooksPaginated = async (req, res) => {
  try {
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

// MongoDB'den verileri çekme
const books = await Book.find(query, null, options);

const totalBooks = await Book.countDocuments(searchQuery);
const totalPages = Math.ceil(totalBooks / pageSizeNumber);

res.json(books);
} catch (err) {
res.status(500).send('Veritabanı hatası: ' + err.message);
}
};
