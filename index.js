const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// MySQL bağlantısı
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // MySQL kullanıcı adınız
  password: '198402',  // MySQL şifreniz
  database: 'mebotomasyondb'  // Databasenizin adı
});

// MySQL bağlantısını kontrol etme
db.connect((err) => {
  if (err) {
    console.error('MySQL bağlantısı başarısız: ' + err.stack);
    return;
  }
  console.log('MySQL bağlantısı başarıyla sağlandı.');
});

// Express middleware
app.use(express.json());

// Kitapları listeleme endpoint'i
app.get('/api/books', (req, res) => {
  const sql = 'SELECT * FROM book';
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Veritabanı hatası' });
      return;
    }
    res.json(results);
  });
});

// Kitap ekleme endpoint'i
app.post('/api/books', (req, res) => {
  const { ad, yazar, sayfa_sayisi, isbn, sayi } = req.body;
  const sql = 'INSERT INTO book (ad, yazar, sayfa_sayisi, isbn, sayi) VALUES (?, ?, ?, ?, ?)';

  const values = [ad, yazar, sayfa_sayisi, isbn, sayi];

  db.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Veritabanına kitap eklenirken bir hata oluştu' });
      return;
    }
    res.json({ message: 'Kitap başarıyla eklendi', id: result.insertId });
  });
});

// Kitap detayını getirme endpoint'i
app.get('/api/books/:id', (req, res) => {
    const bookId = req.params.id;
    const sql = 'SELECT * FROM book WHERE id = ?';
  
    db.query(sql, [bookId], (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Veritabanı hatası' });
        return;
      }
  
      if (results.length === 0) {
        res.status(404).json({ error: 'Kitap bulunamadı' });
        return;
      }
  
      res.json(results[0]);
    });
  });

  // Kitap güncelleme endpoint'i (PUT)
app.put('/api/books/:id', (req, res) => {
    const bookId = req.params.id;
    const { ad, yazar, sayfa_sayisi, isbn, sayi } = req.body;
    const sql = 'UPDATE book SET ad=?, yazar=?, sayfa_sayisi=?, isbn=?, sayi=? WHERE id=?';
    const values = [ad, yazar, sayfa_sayisi, isbn, sayi, bookId];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Veritabanında kitap güncellenirken bir hata oluştu' });
        return;
      }
  
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Güncellenecek kitap bulunamadı' });
        return;
      }
  
      res.json({ message: 'Kitap başarıyla güncellendi' });
    });
  });

  // Kitap kısmi güncelleme endpoint'i (PATCH)
app.patch('/api/books/:id', (req, res) => {
    const bookId = req.params.id;
    const updatedFields = req.body;
    const sql = 'UPDATE book SET ad=? WHERE id=?';
  
    db.query(sql, [updatedFields, bookId], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Veritabanında kitap güncellenirken bir hata oluştu' });
        return;
      }
  
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Güncellenecek kitap bulunamadı' });
        return;
      }
  
      res.json({ message: 'Kitap başarıyla güncellendi' });
    });
  });

// Server'ı dinleme
app.listen(port, () => {
  console.log(`Server ${port} portunda çalışıyor`);
});
