
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
    res.send(`welcome to the profile page of, ${req.params.userName}`);  
});

app.get("/auther/:userName/:age",function(req,res){
    res.send(`welcome to the profile auther page of , ${req.params.userName} and age is ${req.params.age}`);
});

app.listen(5000,function(){
    console.log("server is running on port 5000");
});


