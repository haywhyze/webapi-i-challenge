// implement your API here
const express = require('express');
const userModel = require('./data/db');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to Lambda Users API')
});

app.get('/api/users', (req, res) => {
  userModel.find()
    .then(data => {
      res.status(200).json(data)
    }).catch(error => {
      res.status(500).json(error)
    })
});

app.listen(1900, () => console.log('app listening on port 1900'));
