// Required modules ko import kar rahe hain
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/user"); // User model import
const bcrypt = require("bcrypt"); // Password encrypt karne ke liye
const jwt = require("jsonwebtoken"); // Token generate karne ke liye

// Middlewares
app.use(express.json()); // JSON data ko parse karta hai
app.use(express.urlencoded({ extended: true })); // Form data handle karta hai
app.use(express.static(path.join(__dirname, "public"))); // Static files serve karta hai
app.use(cookieParser()); // Cookies ko parse karta hai

// View engine set kar rahe hain EJS
app.set("view engine", "ejs");

// Home page render karne ke liye
app.get("/", (req, res) => {
  res.render("index");
});

// New user create karne ka route
app.post("/create", (req, res) => {
  let { userName, email, password, age } = req.body;

  // Salt generate karte hain password hash karne ke liye
  bcrypt.genSalt(10, (err, salt) => {
    // Password ko hash kar rahe hain
    bcrypt.hash(password, salt, async (err, hash) => {
      // Hashed password ke saath user create karte hain
      let createdUser = await userModel.create({
        userName,
        email,
        password: hash,
        age,
      });

      // JWT token generate karke cookie mein set kar rahe hain
      let token = jwt.sign({ email }, "Tinkal");
      res.cookie("token", token);

      res.send(createdUser); // User return kar rahe hain
    });
  });
});

// Logout karne ke liye cookie empty kar rahe hain
app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
});

// Login form render karne ke liye
app.get("/login", (req, res) => {
  res.render("login");
});

// Login form submit hone par
app.post("/login", async (req, res) => {
  // Email se user find kar rahe hain
  let user = await userModel.findOne({ email: req.body.email });

  // Agar user nahi mila to error bhej rahe hain
  if (!user) return res.send("something went wrong");

  // Password compare kar rahe hain
  bcrypt.compare(req.body.password, user.password, function (err, result) {
    if (result) {
      // Agar password match ho gaya to token generate karke cookie mein set kar rahe hain
      let token = jwt.sign({ email: user.email }, "Tinkal");
      res.cookie("token", token);
      res.send("you can login dear");
    } else {
      res.send("something went wrong ;");
    }
  });
});

// Server start kar rahe hain
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started on port`, PORT);
});
