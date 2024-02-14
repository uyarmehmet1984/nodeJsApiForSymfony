// const express = require('express');
// const mysql = require('mysql');
// const bodyParser = require('body-parser');

// const app = express();
// const port = 3000;

// app.use(bodyParser.json());

// // MySQL bağlantısı
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root', // MySQL kullanıcı adınız
//   password: '', // MySQL şifreniz
//   database: 'mebotomasyondb' // Veritabanı adı
// });

// db.connect((err) => {
//   if (err) {
//     console.error('MySQL bağlantısı başarısız: ' + err.message);
//   } else {
//     console.log('MySQL bağlantısı başarılı.');
//   }
// });

// // GET: Tüm kitapları listele
// app.get('/books', (req, res) => {
//   db.query('SELECT * FROM book', (err, results) => {
//     if (err) {
//       res.status(500).send('Veritabanı hatası: ' + err.message);
//     } else {
//       res.json(results);
//     }
//   });
// });

// // GET: Belirli bir kitabı getir
// app.get('/books/:id', (req, res) => {
//   const bookId = req.params.id;
//   db.query('SELECT * FROM book WHERE id = ?', [bookId], (err, results) => {
//     if (err) {
//       res.status(500).send('Veritabanı hatası: ' + err.message);
//     } else if (results.length === 0) {
//       res.status(404).send('Kitap bulunamadı.');
//     } else {
//       res.json(results[0]);
//     }
//   });
// });

// // POST: Yeni bir kitap ekle
// app.post('/books', (req, res) => {
//   const newBook = req.body;
//   // Veri doğrulama
//   if (!newBook.ad || !newBook.yazar || !newBook.sayfa_sayisi || !newBook.isbn || !newBook.sayi) {
//     return res.status(400).send('Eksik bilgi, lütfen tüm alanları doldurun.');
//   }
//   console.log(newBook);//NE geliyor bakalım
//   db.query('INSERT INTO book (ad, yazar, sayfa_sayisi, isbn, sayi) VALUES (?, ?, ?, ?, ?)',
//     [newBook.ad, newBook.yazar, newBook.sayfa_sayisi, newBook.isbn, newBook.sayi],
//     (err, results) => {
//       if (err) {
//         console.error('Veritabanı hatası: ' + err.message);
//         res.status(500).send('Veritabanı hatası: ' + err.message);
//       } else {
//         console.log('Kitap başarıyla eklendi. ID: ' + results.insertId);
//         res.status(201).send('Kitap başarıyla eklendi. ID: ' + results.insertId);
//       }
//     });
// });


// // PUT: Belirli bir kitabı güncelle
// app.put('/books/:id', (req, res) => {
//   const bookId = req.params.id;
//   const updatedBook = req.body;
//   const { ad, yazar, sayfa_sayisi, isbn, sayi } = updatedBook;

//   db.query(
//     'UPDATE book SET ad=?, yazar=?, sayfa_sayisi=?, isbn=?, sayi=? WHERE id = ?',
//     [ad, yazar, sayfa_sayisi, isbn, sayi, bookId],
//     (err, results) => {
//       if (err) {
//         res.status(500).send('Veritabanı hatası: ' + err.message);
//       } else if (results.affectedRows === 0) {
//         res.status(404).send('Kitap bulunamadı.');
//       } else {
//         res.send('Kitap başarıyla güncellendi.');
//       }
//     }
//   );
// });



// // DELETE: Belirli bir kitabı sil
// app.delete('/books/:id', (req, res) => {
//   const bookId = req.params.id;
//   db.query('DELETE FROM book WHERE id = ?', [bookId], (err, results) => {
//     if (err) {
//       res.status(500).send('Veritabanı hatası: ' + err.message);
//     } else if (results.affectedRows === 0) {
//       res.status(404).send('Kitap bulunamadı.');
//     } else {
//       res.send('Kitap başarıyla silindi.');
//     }
//   });
// });

// // GET: Kitapları filtreleme ve sıralama
// app.get('/books', (req, res) => {
//   let query = 'SELECT yazar FROM book';

//   // Filtreleme
//   const { yazar, sort } = req.query;
//   if (yazar) {
//     query += ` WHERE yazar = '${yazar}'`;
//   }

//   // Sıralama
//   if (sort) {
//     const validSortOrders = ['asc', 'desc'];
//     const sortOrder = validSortOrders.includes(sort) ? sort.toUpperCase() : 'ASC';
//     query += ` ORDER BY ad ${sortOrder}`;
//   }
// // Hata Middleware'i
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Bir şeyler ters gitti!');
// });
//   db.query(query, (err, results) => {
//     if (err) {
//       res.status(500).send('Veritabanı hatası: ' + err.message);
//     } else {
//       res.json(results);
//     }
//   });
// });




// // Sunucuyu dinle
// app.listen(port, () => {
//   console.log(`Server listening at http://localhost:${port}`);
// });

// index.js
const express = require('express');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/book');  // routes/book.js dosyanızın yolu
const db = require('./db_mysql');
require('express-async-errors'); // eklentiyi projeye ekleyin

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());

// Rotalar
app.use(bookRoutes);

// Ana sayfa
app.get('/', (req, res) => {
  res.send('Merhaba, Express uygulamasına hoş geldiniz');
});

// Server'ı başlat
app.listen(port, () => {
  console.log(`Server ${port} portunda çalışıyor.`);
});

