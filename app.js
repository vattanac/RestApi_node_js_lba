const express = require('express');
const app = express();
//log server 
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router =  require('./routes/user');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('./public')); 
app.use(morgan('combined'));
app.use(router);

app.get("/", (req, res) => {
    console.log("Responding root route");
    res.send("home page");
});

//localhost:3000
app.listen(3000, () => {
    console.log('listening on port 3000....');
    
});