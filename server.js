 require('dotenv').config();
 const express = require('express'); //import
 const bodyParser = require('body-parser'); //import
 const jwt = require('jsonwebtoken'); //import

 const app = express(); //initialize

//  middleware, use the express to call middlewares
app.use(express.json()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// routes

// server
const port = process.env.PORT; //setting up the port 
app.listen(port, ()=>{ //run to use port 5000
    console.log(`Server running on ${port}`);
});