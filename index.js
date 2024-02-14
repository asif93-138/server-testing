const express = require('express')
const app = express()
const test = require('./testData.json');
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('<h1>Server is running!</h1>')
})

app.get('/test', (req, res) => {
    res.send(test)
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})