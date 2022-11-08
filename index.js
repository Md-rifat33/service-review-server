const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000

// middleWares
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dfgrb9f.mongodb.net/?retryWrites=true&w=majority`

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
})

async function run() {
  try {
    const cobblerServices = client.db('cobblerService').collection('services')
    app.get('/', async (req, res) => {
      const query = {}
      const limit = 3
      const cursor = cobblerServices.find(query).limit(limit)
      const service = await cursor.toArray()
      res.send(service)
    })
  } finally {
  }
}

run().catch((err) => console.log(err))

app.get('/', (req, res) => {
  res.send('server is running')
})

app.listen(port, () => {
  console.log(`server listening on ${port}`)
})
