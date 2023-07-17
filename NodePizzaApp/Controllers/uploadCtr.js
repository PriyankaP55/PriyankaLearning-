const express = require("express");
const db = require("../db");
const bodyParser = require("body-parser");
const app = express();
const sqlConn = require("mssql");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
const multer = require("multer");

var storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage });


//to upload all items
app.post("/upload", upload.single("ImgPath"), async (req, res) => {
  try {
    let ImgPath = req.file.path;
    let DocName = req.file.filename;
    let DocTitle = req.body.DocTitle;
    let Price = req.body.Price;
    let Description = req.body.Description;
    let UploadedDate = new Date().toISOString().slice(0, 19).replace("T", " ");
    const sql = `INSERT INTO Pz_InsertImages (DocName,Imgpath,UploadedDate,Price,Description,DocTitle) VALUES ('${DocName}','${ImgPath}','${UploadedDate}','${Price}','${Description}','${DocTitle}')`;
    let connection = await sqlConn.connect(db);
    let result = await connection.query(sql);
    return res.send({ ResponseStatus: "Success", Message: "uploaded" });
  } catch (err) {
  }
});


//get all images with details for main page
app.get("/GetAllImages", async (req, res) => {
  try {
    const sql = `select * from Pz_InsertImages`;

    let connection = await sqlConn.connect(db);
    let result = await connection.query(sql);

    return res.send({ ResponseStatus: "Success", data: result.recordsets });
  } catch (err) {
    res.status(201).json("error...", err);
  }
});


// app.get("/GetImagesById/:Id", async (req, res) => {

//     try {
//         const  Id  = req.params.Id;
//         console.log('data by Id.......',Id)
//       const conn = await sqlConn.connect(db);
//       const result = await conn.query(`SELECT * FROM Pz_InsertImages WHERE DocId = '${Id}'`);
//       //conn.close();
//       //console.log('data by Id.......',result.recordset)
//       return res.send(result.recordset);
//     } catch (error) {
//       console.log(error);
//       return res.status(500).send("Error retrieving images");
//     }
//   });

module.exports = app;
