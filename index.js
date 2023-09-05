const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const BASE_PATH = __dirname + '/';
const HTML_FILE_PATH = __dirname + '/index.html';
const DB_TABLE_NAME = "\"Employee\"";
const DB_CONNECTION_MSG = "Connected to DB!";

const app = express();
app.use(express.static(BASE_PATH));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// PostgreSQL configuration
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT || 5432,
  ssl: true,
});

app.get('/', function (req, res) {
  res.sendFile(HTML_FILE_PATH);
});

app.post('/', function (req, res) {
  console.log(DB_CONNECTION_MSG);
  const query = getInsertQuery(req.body);

  // Use the 'pg' module for query execution
  pool.query(query)
    .then(result => {
      console.log(result);
      console.log("1 Employee updated");
      setTimeout(() => res.sendFile(HTML_FILE_PATH), 1000);
    })
    .catch(err => {
      throw err;
    });
});

/**
 * 
 * @param {*} requestBody
 * @returns  'INSERT' query string 
 */
function getInsertQuery(requestBody) {
  const headers = `"IDNumber", "FirstName", "LastName", "DateOfBirth", "Salary"`;
  const formValues = {
    idNumber: requestBody.idNumber,
    firstName: requestBody.firstName,
    lastName: requestBody.lastName,
    dateOfBirth: requestBody.dateOfBirth,
    salary: requestBody.salary,
  };
  const valuesAsStr = Object.values(formValues).map(value => `'${value}'`).join(",");
  return `INSERT INTO ${DB_TABLE_NAME} (${headers}) VALUES (${valuesAsStr}) 
           ON CONFLICT ("IDNumber")
           DO UPDATE SET 
              "FirstName"=EXCLUDED."FirstName",
              "LastName"=EXCLUDED."LastName",
              "DateOfBirth"=EXCLUDED."DateOfBirth",
              "Salary"=EXCLUDED."Salary"`;
}

const port = process.env.PORT || 80;
const server = app.listen(port, () => console.log('Online!'));
