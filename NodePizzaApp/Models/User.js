const sql = require('mssql');

const userSchema = new sql.ConnectionPool({
    UserName :{
    type: String,
    required: true
    } ,
    
    Email : {
        type: String,
        required: true,
        unique:true,
    },
    Mobile:{
        type: String,
        required: true
    },
    Password :{
        type: String,
        required: true
    },   
    ConfirmPassword:{
        type: String,
        required: true
    }
});