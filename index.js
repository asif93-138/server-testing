const express = require('express')
const app = express()
const cors = require("cors")
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const test = require('./testData.json');
const port = process.env.PORT || 3000


app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://server-testing-DB:QHpEy7Y7shd8qCuR@cluster0.iuweya4.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const database = client.db("test");
    const docs = database.collection("basicDocs");

    app.get('/docs', async(req, res) => {
        const cursor = docs.find();
        const result = await cursor.toArray();
        res.send(result);
    })

    app.post('/docs', async(req, res) => {
        const singleDoc = req.body;
        const result = await docs.insertOne(singleDoc);
        res.send(result);
    })

    app.delete('/docs/:id', async(req, res) => {
        const id = req.params.id;
        console.log('delete', id);
        const query = { _id: new ObjectId(id) };
        const result = await docs.deleteOne(query);
        res.send(result);
    })

    app.post('/docs/:id', async(req, res) => {
        const id = req.params.id;
        const singleDoc = req.body;
        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
            $set: {
              message: singleDoc.message
            },
          };
        const result = await docs.updateOne(filter, updateDoc);
        res.send(result);
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('<h1>Server is running!</h1>')
})

app.get('/test', (req, res) => {
    res.send(test)
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})