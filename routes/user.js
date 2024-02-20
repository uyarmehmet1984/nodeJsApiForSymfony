// routes/book.jscontrollers\bookController.js
const express = require('express');
const router = express.Router();
const userController= require('../controllers/userController');



// GET: Tüm kullaıcıları getir
router.get('/users', userController.getAllUsers);


module.exports = router;