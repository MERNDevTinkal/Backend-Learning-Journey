const express = require("express");
const app = express();
const userModel = require("./models/user");
const path = require("path");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/profile", isLoggedIn, (req, res) => {
  console.log(req.user);
  res.render("login");
});

app.post("/register", async (req, res) => {
  let { userName, name, age, email, password } = req.body;
  let user = await userModel.findOne({ email });
  if (user) return res.status(400).send("user already registered");

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      //  console.log(hash);
      let user = await userModel.create({
        userName,
        name,
        age,
        email,
        password: hash,
      });
      let token = jwt.sign({ email: user.email, userid: user._id }, "Tinkal");
      res.cookie("token", token);
      //   console.log(token);
      res.send("Hello User, You are registered now");
    });
  });
});

app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email });

  if (!user) return res.status(400).send("Something went wrong");

  // Load hash from your password DB.
  bcrypt.compare(password, user.password, function (err, result) {
    if (result) {
        let token = jwt.sign({ email: user.email, userid: user._id }, "Tinkal");
        res.cookie("token", token);

      res.status(200).send("now you have loged in ");


    } else res.redirect("/login");
  });
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/login");
});

function isLoggedIn(req, res, next) {
  if (req.cookies.token === "") res.send("You must be logged in");
  else {
    let data = jwt.verify(req.cookies.token, "Tinkal");
    req.user = data;
  }
  next();
}

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
