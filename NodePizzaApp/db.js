const sql = require('mssql')
const app = require('express')

const config = {
  server: 'IND-SYS-23\\SQLEXPRESS',
  database: 'PizzaDB',
  user: 'TestUser',
  password: 'Test@1234',
  integratedSecurity: true,
  trustServerCertificate: true

}

sql.connect(config)
  .then(() => {
    console.log('Connected to SQL Server using Windows Authentication')
  })
  .catch((err) => {
    console.log('Error connecting to SQL Server', err)
  })

module.exports = sql
