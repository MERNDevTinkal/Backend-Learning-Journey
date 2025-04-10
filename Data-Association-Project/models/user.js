const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/DataAssociationProject");

const userSchema = mongoose.Schema({
    userName : String,
    name : String,
    age : Number,
    email : String,
    password : String,
    profilepic:{
        type : String,
        default : "default.jpeg" ,
    },
    posts : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "post"
        }
    ],
});

module.exports = mongoose.model("user", userSchema);
