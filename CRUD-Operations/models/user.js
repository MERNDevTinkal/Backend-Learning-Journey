const { name } = require("ejs");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/TinkalDatabase");

const userSchema = mongoose.Schema({
    image : String,
    name : String,
    email : String
});

module.exports = mongoose.model("user",userSchema);