const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const auth = require('./auth');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  res.json(auth.register(username, password));
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  res.json(auth.login(username, password));
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));