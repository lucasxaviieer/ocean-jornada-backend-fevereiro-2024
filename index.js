const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const dbUrl = 'mongodb+srv://admin:aP3xoYqK6vccWXIM@cluster0.uwycphk.mongodb.net'
const dbName = 'OceanJornadaBackendFev2024'

//criando o await dentro de uma async para unir as boxes e fazer os processos se interligarem   
async function main() {

  // criando conexao entre backend e cliente mongodb
  const client = new MongoClient(dbUrl)

  // criando a conexao com o client
  console.log('Conetando com o banco de dados...')
  await client.connect() // retorna um promise<MongoCliente> usando o await
  // para que so avance quando a conexao for efetivada ou seja finalizada a promise
  // promise é um processamento assincrono 
  console.log('Banco de dados conectado com sucesso!')

  const app = express()

  app.get('/', function (req, res) {
    res.send('Hello, World!')
  })

  app.get('/oi', function (req, res) {
    res.send('Olá, Mundo!')
  })

  // Lista de personagens

  const lista = ["Rich Sanchez", "Morty Smith", "Summer Smith"]

  const db = client.db(dbName)
  const collection = db.collection('items')

  // ReadAll -> [GET] /item

  app.get('/item', async function (req, res) {

    // realizamos a operaçao de find na collection do mongodb
    const items = await collection.find().toArray() // transformando a collection em lista que é o tipo do JS, detalhe, é uma promise de retorno

    // envio de todos os documentos como resposta HTTP
    res.send(items)
  })

  // Read by id -> [GET] /item/:id parametro de rota (:)

  app.get('/item/:id', async function (req, res) {
    const id = req.params.id // extraindo o id da requisiçao

    const item = await collection.findOne({
      _id: new ObjectId(id) // transformando um id string recebido na reqeuisiçao em um id do tipo objectid
      // para assim comparar com os collections do banco
    }) 
    /*
    if(item === null){
      return app.status("404").send("Not found id")
    }
    */
    res.send(item) // envio do document obtido como resposta HTTP

  })

  // Sinalizamos que o corpo da requisiçao esta em JSON
  app.use(express.json())

  // Create -> [POST] /item
  app.post('/item', async function (req, res) {

    const item = req.body // pegando o corpo da reqeuisicao

    // Colocamos o nome dentro da collection de itens
    await collection.insertOne(item)

    res.send(item) // retornando o item adicionado
  })

  app.listen(3000)
}

// depois de colocar nosso codigo dentro do funciton main e chamamos aqui para rodar a mesma
main()