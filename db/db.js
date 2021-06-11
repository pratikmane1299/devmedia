const mongoose = require('mongoose');

async function connectToDB(mongoDBUri) {
  return mongoose.connect(mongoDBUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });
}

module.exports = connectToDB;
