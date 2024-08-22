// netlify/functions/fetch-data.js
const sql = require('mssql');
require('dotenv').config();

exports.handler = async function(event, context) {
  const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
      encrypt: true // Pour SQL Server sur Azure
    }
  };

  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM MGK_log_preparation_changes');
    return {
      statusCode: 200,
      body: JSON.stringify(result.recordset),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
