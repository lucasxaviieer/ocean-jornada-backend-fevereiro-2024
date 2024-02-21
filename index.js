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

// Read by id -> [GET] /item/:id parametro de rota (:)

app.get('/item/:id', function(req, res){
  const id = req.params.id // extraindo o id da requisiçao

  const item = lista[id] // acesso item na lista baseado no id da requisiçao
  res.send(item) // envio do item obtido como resposta HTTP
  
})

app.listen(3000)