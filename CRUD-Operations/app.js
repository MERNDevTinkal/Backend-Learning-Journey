const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/user");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", async (req, res) => {
  let { name, email, image } = req.body;
  let createUser = await userModel.create({
    name,
    email,
    image,
  });
   res.redirect('/read');
});

app.get("/read", async (req, res) => {
    let readUser = await userModel.find();
   // res.send(readUser);
   res.render("read" , {readUser});
 });

 app.get("/delete/:id",async (req,res)=> {
    let deleteUser = await userModel.findOneAndDelete({ _id: req.params.id })
   // res.send(deleteUser);
   res.redirect("/read");
 })

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
