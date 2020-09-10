const express = require('express')
const app = express()
const port = 3001
const routes = require('./routes')

app.use(express.json())

/** DEMO MIDDLEWARE */
app.use('*', (req, res, next) => {
    console.log('This middleware does nothing')
    next()
})



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/', routes)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
  