// bookModel.js
const db = require('../db_mysql');

// Tüm kitapları getir
exports.getAllBooks = (callback) => {
  const query = 'SELECT * FROM book';
  db.query(query, callback);
};

// Belirli bir kitabı getir
exports.getBookById = (bookId, callback) => {
  const query = 'SELECT * FROM book WHERE id = ?';
  db.query(query, [bookId], callback);
};

// Yeni bir kitap ekle
exports.addBook = (newBook, callback) => {
  const query = 'INSERT INTO book SET ?';
  db.query(query, [newBook], callback);
};

// Belirli bir kitabı güncelle
exports.updateBook = (bookId, updatedBook, callback) => {
  const query = 'UPDATE book SET ? WHERE id = ?';
  db.query(query, [updatedBook, bookId], callback);
};

// Belirli bir kitabı sil
exports.deleteBook = (bookId, callback) => {
  const query = 'DELETE FROM book WHERE id = ?';
  db.query(query, [bookId], callback);
};

// Sayfalı olarak kitapları getir
exports.getBooksPaginated = (page, pageSize, sort, yazar, callback) => {
  const offset = (page - 1) * pageSize;
  let query = 'SELECT * FROM book';

  // Yazar filtresi
  if (yazar) {
    query += ` WHERE yazar = '${yazar}'`;
  }

  // Sıralama
  if (sort) {
    const sortOrder = sort === 'asc' ? 'ASC' : 'DESC';
    query += ` ORDER BY ad ${sortOrder}`;
  }

  query += ' LIMIT ? OFFSET ?';

  db.query(query, [pageSize, offset], callback);
};
