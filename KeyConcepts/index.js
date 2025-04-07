const express = require("express");
const app = express();
const path = require("path");
const fs = require('node:fs');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// GET route
app.get("/", function (req, res) {
    fs.readdir("./files", function (err, files) {
        res.render("index", { files: files });
    });
});

// POST route 
app.post("/create", function (req, res) {
    fs.writeFile(`./files/${req.body.Title.split(" ").join("")}.txt`, req.body.details, function (err) {
        res.redirect('/');
    });
});

//  Server listen bhi bahar hi hona chahiye
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
