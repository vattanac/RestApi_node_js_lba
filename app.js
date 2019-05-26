const express = require('express');
const app = express();
//log server 
const morgan = require('morgan');
const mysql = require('mysql');

app.use(morgan('combined'));

app.get('/user/:id', (req, res) => {
    console.log("fetching user " + req.params.id);
    
        const connection = mysql.createConnection({
            host:'localhost',
            user: 'root',
            password: 'root',
            database: 'mynode_db',
            port: 8889 //if not put this statement it get nothing from database
        });

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

app.get("/", (req, res) => {
    console.log("Responding root route");
    res.send("home page");
});


app.get("/users", (req, res) => {
    const user1 = {firstname: "kok", lasname:"dara"};
    const user2 = {firstname: "kok", lasname:"dara"};
    res.json([user1, user2]);
});

//localhost:3000
app.listen(3000, () => {
    console.log('listening on port 3000....');
    
});