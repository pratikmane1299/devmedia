require('dotenv').config();
const express = require('express');

const apiRouter = require('./routes/api');
const connectToDB = require('./db/db');

const app = express();

const PORT = process.env.PORT || 3030;

connectToDB(process.env.MONGODB_URI)
  .then(() => console.log('Connected to database'))
  .catch((err) => console.error(err.message));

app.get('/', (req, res) => {
  res.send('Hello World !!!');
});

app.use('/api/v1', apiRouter);

app.listen(PORT, () => {
  console.log(`SERVER running on http://localhost:${PORT}/`);
});
