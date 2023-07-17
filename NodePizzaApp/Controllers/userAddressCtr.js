const express = require('express');
const db = require('../db');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const app = express();
const sqlConn = require('mssql');
const jwt = require('jsonwebtoken');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// sign up api
app.post('/SaveAddressDetails', async (req, res) => {
  const { UserId, Address, Landmark, City, ZipCode, State, Country } = req.body
  try {
    const sql = `INSERT INTO UserAddressDetails (UserId,Address,Landmark,City,ZipCode,State,Country) VALUES ('${UserId}','${Address}','${Landmark}','${City}','${ZipCode}','${State}','${Country}')`;
    const connection = await sqlConn.connect(db);
    const result = await connection.query(sql);
    return res.send({ ResponseStatus: 'Success', Message: 'Address added succussfully' });
  } catch (error) {
    return res.send({ ResponseStatus: 'Failed', Message: error });
  }
})

// to get all cart items
app.get('/GetAddress/:UserId', async (req, res) => {
  try {
    const UserId = req.params.UserId;
    const sql = `SELECT * from UserAddressDetails WHERE UserId = '${UserId}'`;
    const connection = await sqlConn.connect(db)
    const result = await connection.query(sql) 
    res.status(200).json({ ResponseStatus: 'Success', data: result.recordset });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
    console.log(err)
  }
})

module.exports = app;
