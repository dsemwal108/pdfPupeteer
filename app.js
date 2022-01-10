const bodyParser = require("body-parser");

const express=require("express");
const bodyparser=require('body-parser');
const dataroutes=require("./routes/data");
const app=express();

app.use(bodyParser.json());
app.use(dataroutes);

app.listen(3000,() => {console.log("post is listining at 3000")});