
const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("index");
});

app.get("/profile/:userName",function(req,res){
    res.send("Hello dear this is Your profilepage Tinkal");
});

app.listen(5000,function(){
    console.log("server is running on port 5000");
});


