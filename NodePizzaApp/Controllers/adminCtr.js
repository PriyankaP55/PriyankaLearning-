const express = require("express");
const db = require("../db");
const bodyParser = require("body-parser");
const app = express();
const sqlConn = require("mssql");
const { now } = require("mongoose");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//to get all cart items
app.get("/GetAllUsersOrders", async (req, res) => {
  try {
    const UserId = req.params.UserId;
    const DocId = req.params.DocId;
    const sql = `SELECT a.DocId,DocName,DocTitle,Price,UserId,Address,MobileNumber,a.InsertDate,OrderId,OrderStatus FROM InsertCartItems a inner join Pz_InsertImages p on a.DocId = p.DocId`;
    let connection = await sqlConn.connect(db);
    let result = await connection.query(sql);  
    res.status(200).json({ ResponseStatus: "Success", data: result.recordset });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
    console.log(err)
  }
});
//to get all cart items
app.get("/GetOrderStatus", async (req, res) => {
  try {
    const sql = `SELECT StatusId,StatusName from OrderStatus`;
    let connection = await sqlConn.connect(db);
    let result = await connection.query(sql);  
    res.status(200).json({ ResponseStatus: "Success", data: result.recordset });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
    console.log(err)
  }
});

app.put("/UpdateOrderStatus", async(req,res)=>{
    console.log('------------')
    const StatusName = req.body.StatusName;
    const UserId = req.body.UserId;
    const DocId = req.body.DocId;
    try{
       
        console.log('------------',DocId)
        const sql = `update InsertCartItems set OrderStatus = '${StatusName}' where UserId= '${UserId}' and DocId = '${DocId}' `;
        let connection = await sqlConn.connect(db);
        let result = await connection.query(sql);  
      
        res.status(200).json({ ResponseStatus: "Success"});
      } catch (err) {
        res.status(500).json({ error: "Internal server error" });
        console.log(err)
    }

});



module.exports = app;
