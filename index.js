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

// Sinalizamos que o corpo da requisiçao esta em JSON
app.use(express.json())

// Create -> [POST] /item
app.post('/item', function(req, res){
  const body = req.body; // Extraímos o corpo da requisição

  // pegamos o nome (string) que foi enviado dentro do body
  const item = body.nome

  // Colocamos o nome dentro da lista de itens
  lista.push(item)

  res.send("Item adicionado com sucesso!")
})

app.listen(3000)