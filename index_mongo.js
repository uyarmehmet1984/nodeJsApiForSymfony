// index.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/book_mongo');
const db = require('./db_mongo');

const app = express();
const port = 4000;

// Middleware
app.use(bodyParser.json());

// MongoDB bağlantısı burası bilgisayardan mongo kullanırken açılacak
// mongoose.connect('mongodb://localhost:27017/mebotomasyondb', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
// })
//   .then(() => {
//     console.log('MongoDB bağlantısı başarılı.');
//   })
//   .catch((err) => {
//     console.error('MongoDB bağlantısı başarısız: ' + err.message);
  //});

// Rotalar
app.use(bookRoutes);

// Ana sayfa
app.get('/', (req, res) => {
  res.send('Merhaba, Mongooooo Atlas uygulamasına hoş geldiniz!');
});

// Server'ı başlat
app.listen(port, () => {
  console.log(`Server ${port} portunda çalışıyor.`);
});



