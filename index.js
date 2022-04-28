
const express = require('express')
const cors = require("express");
const app = express()
const port = process.env.PORT || 5000;

// middle ware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('This is my getway for the main route')
})

app.listen(port, () => {
  console.log(`My port is working on ${port}`)
})