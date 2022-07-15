var express = require('express');
//var bp = require('body-parser');
var mysql = require('mysql');
var app = express();
app.use(express.static(__dirname + '/'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html');
});
app.post('/', function(req, res){
         var con = mysql.createConnection({
             host: "eu-cdbr-west-03.cleardb.net",
             user: "bb685725821d93",
             password: "8d87687d"
         });
        console.log("Connected to DB!");
        let table = "heroku_aa9b39c5b3399b8.employees"
        let headers = "idNumber, firstName, lastName, dateOfBirth, salary"
        let formValues = {idNumber:req.body.idNumber,
                          firstName:`"${req.body.firstName}"`,
                          lastName:`"${req.body.lastName}"`,
                          dateOfBirth:`"${req.body.dateOfBirth}"`,
                          salary:req.body.salary}
        let valuesAsStr = Object.values(formValues).join(",")
        let query = `INSERT INTO ${table} (${headers}) VALUES (${valuesAsStr}) 
                     ON DUPLICATE KEY 
                        UPDATE firstName=${formValues.firstName},
                               lastName=${formValues.lastName},
                               dateOfBirth=${formValues.dateOfBirth},
                               salary=${formValues.salary}`
        con.query(query, function (err, result){
            if (err) throw err;
            res.sendFile(__dirname + "/index.html");
            
            console.log(result);
            console.log("1 Employee updated");
        });
        con.end();
        
});
var port = process.env.PORT || 80;
var server = app.listen(port, ()=> console.log('Online!')); 