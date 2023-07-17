const express = require('express')
const db = require('../db')
const bodyParser = require('body-parser')
const app = express()
const sqlConn = require('mssql')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// api to add cart items
app.post('/AddToCartItems', async (req, res) => {
  const DocId = req.body.DocId
  const UserId = req.body.UserId
  const InsertedDate = new Date().toISOString().slice(0, 19).replace('T', ' ')
  const RowStatus = 1
  if (!DocId || !UserId) {
    return res.status(400).json({ error: 'Id and UserId are required' })
  }

  try {
    const sql = `INSERT INTO Pz_AddToCart (DocId, UserId, InsertedDate, RowStatus) VALUES (${DocId}, ${UserId}, '${InsertedDate}', ${RowStatus})`
    const connection = await sqlConn.connect(db)
    const result = await connection.query(sql)

    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
    console.log(error)
  }
})

// to get all cart items
app.get('/GetAllCartItems/:UserId', async (req, res) => {
  try {
    const UserId = req.params.UserId
    const sql = `SELECT a.DocId,DocName,DocTitle,Price,UserId FROM Pz_AddToCart a inner join Pz_InsertImages p on a.DocId = p.DocId WHERE UserId = '${UserId}' and OrderStatus <> 1`
    const connection = await sqlConn.connect(db)
    const result = await connection.query(sql)
    res.status(200).json({ ResponseStatus: 'Success', data: result.recordset })
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
    console.log(err)
  }
})

// to delete cart items
app.delete('/RemoveCartItems/:DocId/:UserId', async (req, res) => {
  try {
    const DocId = req.params.DocId
    const UserId = req.params.UserId
    const sql = `delete from Pz_AddToCart where DocId = '${DocId}' and  UserId = '${UserId}'`

    // connection.query(sql, [docName,image,insertDate])
    const connection = await sqlConn.connect(db)
    const result = await connection.query(sql)

    return res.send({ ResponseStatus: 'Success', Message: 'Item deleted' })
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// insert order details
app.post('/SaveOrderDetails', async (req, res) => {
  const { DocId, Address, MobileNumber, UserId } = req.body
  // const DocId = req.body.DocId;
  // const Address = req.body.Address;
  // const UserId = req.body.UserId;
  // const MobileNumber = req.body.MobileNumber;
  try {
    const InsertDate = new Date().toISOString().slice(0, 19).replace('T', ' ')

    const sql = `INSERT INTO InsertCartItems (DocId,UserId,InsertDate,Address,MobileNumber,OrderStatus) VALUES ('${DocId}','${UserId}','${InsertDate}','${Address}','${MobileNumber}','Order Placed') update Pz_AddToCart
    set OrderStatus= '1' where UserId = '${UserId}' and DocId='${DocId}'`

    // connection.query(sql, [docName,image,insertDate])
    const connection = await sqlConn.connect(db)
    const result = await connection.query(sql)
    res.status(200).json({ ResponseStatus: 'Success' })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
    console.log(error)
  }
})
// to get all cart items
app.get('/GetAllOrders/:UserId', async (req, res) => {
  try {
    const UserId = req.params.UserId
    // const DocId = req.params.DocId
    const sql = `SELECT a.DocId,DocName,DocTitle,Price,UserId,Address,MobileNumber,a.InsertDate,OrderId,OrderStatus FROM InsertCartItems a inner join Pz_InsertImages p on a.DocId = p.DocId WHERE UserId = '${UserId}'`
    const connection = await sqlConn.connect(db)
    const result = await connection.query(sql)
    res.status(200).json({ ResponseStatus: 'Success', data: result.recordset })
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
    console.log(err)
  }
})
module.exports = app
