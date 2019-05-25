const express = require('express');
const app = express();

//log server 
const morgan = require('morgan');

app.use(morgan('short'));


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