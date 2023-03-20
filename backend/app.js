const cookieParser = require("cookie-parser");
const express = require("express")
const app = express();
const errorMiddleware = require ('./middleware/error');
const bodyParser = require('body-parser');
const path = require("path");
const dotenv =require ('dotenv');
var cors = require("cors");
app.use(cors());
var corsOptions = {
  origin: "http://localhost:3000/",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// using config for environment variable 
dotenv.config({path:'./config/.env'});


//route imports 
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true,limit:"50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));


const user = require("./routes/empRoute");




app.use("/api/v2", user);




app.use(express.static(path.join(__dirname,"../frontend/build")));

app.get("*",(req,res) =>{
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"));
})

//middleware for error
app.use(errorMiddleware);



module.exports = app;