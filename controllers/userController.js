// userController.js
const userModel = require('../models/usermodels');

// GET: Tüm kullanıcıları getir
exports.getAllUsers = (req, res) => {
    bookModel.getAllUsers((err, results) => {
      if (err) {
        res.status(500).send('Veritabanı hatası: ' + err.message);
      } else {
        res.json(results);
      }
    });
  };
  