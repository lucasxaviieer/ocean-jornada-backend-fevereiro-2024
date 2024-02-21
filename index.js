const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello, World!')
})

app.get('/oi', function(req, res) {
    res.send('Olá, Mundo!')
})

// Lisa de personagens

const lista = ["Rich Sanchez", "Morty Smith", "Summer Smith"]

// ReadAll -> [GET] /item

app.get('/item', function(req, res) {
  res.send(lista)
})

app.listen(3000)