// bookModel.js
const db = require('../db_mysql');

// Tüm kullanıcıları getir
exports.getAllUsers = (callback) => {
  const query = 'SELECT * FROM user';
  db.query(query, callback);
};
