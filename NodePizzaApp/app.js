const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser')
const routes = require('./routes')
// const routes = require('./routes')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '')))

app.use(
  cors({
    origin: '*',
    credentials: true
  })
)

app.use(routes)
app.use(cookieParser)
app.listen(3000, function () {
  console.log('Server is running on 3000..')
})

module.exports = app
