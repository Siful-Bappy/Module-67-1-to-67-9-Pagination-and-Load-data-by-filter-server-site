
const express = require('express')
const cors = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;

// middle ware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.u10di.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try{

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