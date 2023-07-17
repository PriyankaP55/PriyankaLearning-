const express = require('express')
const db = require('../db')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const app = express()
const sqlConn = require('mssql')
const jwt = require('jsonwebtoken')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())

// sign up api
app.post('/Register', async (req, res) => {
  const UserName = req.body.UserName
  const Email = req.body.Email
  const Mobile = req.body.Mobile
  const Password = req.body.Password
  const ConfirmPassword = req.body.ConfirmPassword
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(Password, 5)
  const encryptedPassword = await bcrypt.hash(ConfirmPassword, salt)
  const encryptedConfirmPassword = await bcrypt.hash(
    req.body.ConfirmPassword,
    salt
  )
  try {
    const sql = `INSERT INTO UserDetails (UserName,Email,Mobile,Password,ConfirmPassword,UserRole) VALUES ('${UserName}','${Email}','${Mobile}','${hashedPassword}','${encryptedConfirmPassword}','User')`
    const connection = await sqlConn.connect(db)
    const result = await connection.query(sql)
    return res.send({ ResponseStatus: 'Success', Message: 'User created' })
  } catch (error) {
    return res.send({ ResponseStatus: 'Failed', Message: error })
  }
})

// login user
app.post('/login', async (req, res) => {
  try {
    const { Email, Password } = req.body
    const conn = await sqlConn.connect(db)
    const result = await conn.query(
      `SELECT * FROM UserDetails WHERE Email = '${Email}'`
    )
    const user = result.recordset[0]
    if (!user) {
      return res.json({ ResponseStatus: 'Failed', message: 'Invalid credentials' })
    }
    const passwordMatch = await bcrypt.compare(Password, user.Password)
    if (!passwordMatch) {
      return res.json({ ResponseStatus: 'Failed', message: 'Invalid credentials' })
    }
    const token = jwt.sign({ userId: user.Id }, 'your-secret-key')
    user.Password = undefined
    user.ConfirmPassword = undefined
    return res.json({ ResponseStatus: 'Success', Token: token, user })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
})

// login user
app.post('/checkUserExists', async (req, res) => {
  try {
    const { Email } = req.body
    const conn = await sqlConn.connect(db)
    const result = await conn.query(
      `SELECT * FROM UserDetails WHERE Email = '${Email}'`
    )
    const user = result.recordset[0].Email
    console.log(user)

    if (user) {
      return res.status(200).json({ ResponseStatus: 'Success', message: 'Invalid credentials' })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
})

module.exports = app
