const express = require('express')
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000;

// middle ware
app.use(cors());
app.use(express.json());

/* 
const corsConfig = {
    origin: true,
    credentials: true,
    }
app.use(cors(corsConfig))
app.options('*', cors(corsConfig)) 
*/

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.u10di.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try{
        await client.connect();
        const productCollection = client.db("emajohn").collection("product");
        
        app.get("/product", async(req, res) => {
          console.log("query", req.query);
          const page = parseInt(req.query.page);
          const size = parseInt(req.query.size);
            const query = {};
            const cursor = productCollection.find(query);
            let products;
            // const products = await cursor.limit(76).toArray();
            if(page || size) {
              products = await cursor.skip(page*size).limit(size).toArray();
            } else {
              products = await cursor.toArray();
            }
            res.send(products);
          })

        app.get("/productCount", async(req, res) => {
          const query = {};
          const cursor = productCollection.find(query);
          const count = await productCollection.estimatedDocumentCount
          ();
          // in future cursor er opre count kora jabe na ti new way te use kora
          // const count = await cursor.count();
          // because we are sending as string
          res.send({count});
        })

        //use post to get product by id
        app.post("/productByKeys", async(req, res) => {
          const keys = req.body;
          const ids = keys.map(id => ObjectId(id));
          const query = {_id: {$in: ids}};
          const cursor = productCollection.find(query);
          const products = await cursor.toArray();
          res.send(products);
          console.log(keys);
        })
    }
    finally{
        
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('This is my getway for the main route')
})

app.listen(port, () => {
  console.log(`My port is working on ${port}`)
})