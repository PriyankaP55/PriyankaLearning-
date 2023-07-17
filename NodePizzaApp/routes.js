
const express = require('express')
const cors = require('cors')
const app = express()
const user = require('./Controllers/UserController')
const upload = require('./Controllers/uploadCtr')
const cart = require('./Controllers/cartCtr')
const admin = require('./Controllers/adminCtr')
const userAddress = require('./Controllers/userAddressCtr')
const testapp = require('./Controllers/testCtr')

app.use(user)
app.use(testapp)
app.use(admin)
app.use(cart)
app.use(upload)
app.use(userAddress)
app.get('/', (req, res) => {
  res.send('Home Page')
})

module.exports = app
