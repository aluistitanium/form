const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors'); // Adicionado para permitir CORS

const app = express();
const port = 3000;

// Middleware para permitir CORS
app.use(cors());

// Middleware para ler dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Conexão com MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Pa29142721*', // sua senha do MySQL
  database: 'teste' // nome do banco
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conectado ao MySQL!');
});

// Rota que recebe o POST do formulário
app.post('/enviar', (req, res) => {
  const nome = req.body.nome;
  const sql = 'INSERT INTO usuarios (nome) VALUES (?)';
  db.query(sql, [nome], (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados:', err);
      res.status(500).send('Erro ao salvar os dados.');
      return;
    }
    res.send('Nome salvo com sucesso!');
  });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});