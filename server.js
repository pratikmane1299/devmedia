const express = require('express');

const apiRouter = require('./routes/api');

const app = express();

const PORT = process.env.PORT || 3030;

app.get('/', (req, res) => {
  res.send('Hello World !!!');
});

app.use('/api/v1', apiRouter);

app.listen(PORT, () => {
  console.log(`SERVER running on http://localhost:${PORT}/`);
});
