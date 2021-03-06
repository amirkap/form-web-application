var express = require('express');
var mysql = require('mysql');
var dotenv = require('dotenv');
dotenv.config();

const BASE_PATH = __dirname + '/';
const HTML_FILE_PATH = __dirname + '/index.html';
const DB_TABLE_NAME = "heroku_aa9b39c5b3399b8.employees";
const DB_CONNECTION_MSG = "Connected to DB!";

var app = express();
app.use(express.static(BASE_PATH));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', function(req,res){
    res.sendFile(HTML_FILE_PATH);
});
app.post('/', function(req, res){
         var con = mysql.createConnection({
             host: process.env.DB_HOST,
             user: process.env.DB_USER,
             password: process.env.DB_PASSWORD
         });
        console.log(DB_CONNECTION_MSG);
        let query = getInsertQuery(req.body);
        con.query(query, function (err, result){
            if (err) throw err;
            console.log(result);
            console.log("1 Employee updated");
            setTimeout(() => res.sendFile(HTML_FILE_PATH), 1000);  
        });
        con.end();       
});

/**
 * 
 * @param {*} requestBody
 * @returns  'INSERT' query string 
 */
function getInsertQuery (requestBody) {
    let headers = "idNumber, firstName, lastName, dateOfBirth, salary"
        let formValues = {idNumber:requestBody.idNumber,
                          firstName:`"${requestBody.firstName}"`,
                          lastName:`"${requestBody.lastName}"`,
                          dateOfBirth:`"${requestBody.dateOfBirth}"`,
                          salary:requestBody.salary}
        let valuesAsStr = Object.values(formValues).join(",");
        return `INSERT INTO ${DB_TABLE_NAME} (${headers}) VALUES (${valuesAsStr}) 
                     ON DUPLICATE KEY 
                        UPDATE firstName=${formValues.firstName},
                               lastName=${formValues.lastName},
                               dateOfBirth=${formValues.dateOfBirth},
                               salary=${formValues.salary}`;
}

var port = process.env.PORT || 80;
var server = app.listen(port, ()=> console.log('Online!')); 