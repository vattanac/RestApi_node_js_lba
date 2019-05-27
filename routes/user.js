const express = require('express');
const router = express.Router();
const mysql = require('mysql');


router.get('/messages', (req, res) => {
    console.log("router page testing");
    res.end();
});


router.get("/users", (req, res) => {
    const connection = getConnection();
    const queryString = "SELECT * FROM users";
    connection.query(queryString, (err,rows,fields) => {
       if (err) {
           console.log("Fail to Query user" +err);
           res.send(500);
           return;
       }     
       res.json(rows);   
    });            
});

const pool = mysql.createPool({
    connectionLimit: 10,
    host:'us-cdbr-iron-east-02.cleardb.net',
    user: 'bc8591db7ef4aa',
    password: '67b00517',
    database: 'heroku_7b5326385f019d6', 
});
function getConnection(){
    return pool;
}

router.post('/user_create', (req, res) => {
    console.log("First Name: " + req.body.create_first_name);

    const firstName = req.body.create_first_name;
    const lastName = req.body.create_last_name;
    
    const queryInsert = "INSERT INTO users(first_name, last_name) VALUES(?,?)";
    getConnection().query(queryInsert,[firstName, lastName], (err, results, fields) => {
        if (err) {
            console.log("fail to creae user!!!");
            res.send(500);
            return;
        }
        console.log("Insert new user with Id:" + results.insertId);
        res.end();
    });
});

router.get('/user/:id', (req, res) => {
    console.log("fetching user " + req.params.id);
    
        const connection = getConnection();

        const userId = req.params.id;
        const queryString = "SELECT * FROM users WHERE id = ?";
        connection.query(queryString, [userId], (err,rows,fields) => {
            
            if (err) {
                //res.status(500).send({error: 'something failed'});
                res.sendStatus(500);
                return;
            }

            //change field name in database to display ex: u_id -> id
            const users = rows.map((row) => {
                return {firstname: row.first_name, lastname: row.last_name};
            });
            res.json(users);
            
        });
          
});
module.exports = router;