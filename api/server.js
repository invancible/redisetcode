const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
const app = require('./app');

mongoose.connect(process.env.DB_URL).then(() => {
  console.log('DB Connection OK!');
  app.listen(process.env.PORT);
});
