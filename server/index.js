const express = require('express');
const app = express();
const mysql = require ('mysql');
const cors = require ('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'employeesystem',
});

app.post('/create', (req,res) => {
    // console.log(req.body);
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;

    db.query("INSERT INTO employees (name,age,country,position,wage) VALUES (?,?,?,?,?)", [name,age,country,position,wage], (err, result) =>{
        if (err) {
            console.log(err)
        } else {
            res.send("Values Inserted");
        }
    });
})

app.get('/employees',(req,res) => {
    db.query("SELECT * FROM employees", (err, result) =>{
        if (err){
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.delete('/delete', (req,res) => {
    const employee = req.body
    db.query("DELETE FROM employees WHERE name = ?", (err, result) =>{
    if (err){
        console.log(err);
    } else {
        res.send("Values deleted");
    }
    });
})

app.listen(3001, () =>{
    console.log("Server working");
});