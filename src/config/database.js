const mongoose = require('mongoose');
const env = require('./envioroment');

mongoose.set('useCreateIndex', true);
mongoose.connect(env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
