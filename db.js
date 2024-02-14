// db.js
const mysql = require('mysql');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '198402',
  database: 'mebotomasyondb'
};

const db = mysql.createConnection(dbConfig);

db.connect((err) => {
  if (err) {
    console.error('MySQL bağlantısı başarısız: ' + err.message);
  } else {
    console.log('MySQL bağlantısı başarılı.');
  }
});

module.exports = db;
