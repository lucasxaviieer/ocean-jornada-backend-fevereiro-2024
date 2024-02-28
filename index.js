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
    const item = req.body // pegando o corpo da requisicao

    // Colocamos o nome dentro da collection de itens
    await collection.insertOne(item)

    res.send(item) // retornando o item adicionado
  })

  // UPDATE -> [PUT put or patch (put att tudo e o patch atualiza somente o q quer atualizar)] /item/:id
  app.put('/item/:id', async function (req, res){
    const id = req.params.id

    // pegando novo item do corpo da requisiçao
    const newItem = req.body

    // atualizar no banco de dados na collection
    await collection.updateOne(
      { _id: new ObjectId(id) }, // pegando o id da requisiçao tranformando em objectid e filtrando pelo mesmo 
      { $set: newValue } // setando o novo item de forma de update
    )

    res.send("Item atualizado com sucesso!")
  }) 

  // DELETE -> [DEL] '/item/:id'
  app.delete('item/:id', async function(req, res){
    const id = req.params.id // pegando id da rota

    // Realizando operaçao de delete
    await collection.deleteOne(
      {_id: new ObjectId(id)}
    )
    
    //Enviamos uma mensagem de sucesso
    res.send("Deletado com sucesso!")
  })

  app.listen(3000)
}

// depois de colocar nosso codigo dentro do funciton main e chamamos aqui para rodar a mesma
main()