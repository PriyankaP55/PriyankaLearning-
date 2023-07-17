const express = require('express')
const db = require('../db')
const bodyParser = require('body-parser')
const app = express()
const sql = require('mssql')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/InsertData', async (req, res) => {
  const { name, age } = req.body

  try {
    const pool = await sql.connect(db)
    const request = new sql.Request(pool)

    request.input('name', sql.NVarChar(20), name)
    request.input('age', sql.Int, age)

    const result = await request.execute('InsertUserData')

    // console.log('Data inserted successfully')
    res.send({ message: 'Data inserted successfully', result })
  } catch (error) {
    // console.error('Error calling stored procedure: ', error)
    res.status(500).send('Error calling stored procedure')
  }
})

module.exports = app
