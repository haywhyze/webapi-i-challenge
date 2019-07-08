// implement your API here
const express = require('express');
const userModel = require('./data/db');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome to Lambda Users API')
});

app.post('/api/users', (req, res) => {

  const { name, bio } = req.body;

  if (!name || !bio ) {
    return res.status(400).send({
      errorMessage: 'Please provide name and bio for the user.',
    });
  }

  const newUser = {
    name: req.body.name,
    bio: req.body.bio,
  }

  userModel.insert(newUser).then(data => {
    res.status(201).json(data)
  }).catch((error => {
    console.log(error);
    return res.status(500).json({ 
      error: 'There was an error while saving the user to the database'
    });
  }));
})

app.get('/api/users', (req, res) => {
  userModel.find()
    .then(data => {
      return res.status(200).json(data)
    }).catch(error => {
      console.log(error)
      return res.status(500).json({
        error: 'The users information could not be retrieved.'
      })
    })
});

app.get('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id) || id % 1 !== 0 || id < 0) {
    return res.status(400).send({
      error: `user ID provided is not valid`,
    });
  }
  userModel.findById(id)
    .then(data => {
      if (data) 
        return res.status(200).json(data)
      return res.status(404).json({
        error: 'user ID provided does not exist',
      })
    })
});

app.listen(1900, () => console.log('app listening on port 1900'));
