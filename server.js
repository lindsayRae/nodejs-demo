const express = require('express')
const routes = require('./routes')
const passport = require('./auth')

const app = express()
const port = 3001

app.use(express.json())

/** DEMO MIDDLEWARE */
app.use('*', (req, res, next) => {
    console.log('This middleware does nothing')
    next()
})

app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/', routes)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
  