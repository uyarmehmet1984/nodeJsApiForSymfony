// // db_mongo.js burası localden 

// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/mebotomasyondb');

// const db = mongoose.connection;

// db.on('error', (err) => {
//   console.error('MongoDB bağlantı hatası:', err.message);
// });

// db.once('open', () => {
//   console.log('MongoDB bağlantısı başarılı.');
// });

// module.exports = db;


//Atlas Bağlantısı


const mongoose = require('mongoose');

// MongoDB Atlas bağlantı dizesi
const atlasConnectionString = 'mongodb+srv://mehmetmeb06:198402@test-pro-db.zcdgzxm.mongodb.net/?retryWrites=true&w=majority';



const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB bağlantı hatası:', err.message);
});

db.once('open', () => {
  console.log('MongoDB bağlantısı başarılı.');
});

module.exports = db;



