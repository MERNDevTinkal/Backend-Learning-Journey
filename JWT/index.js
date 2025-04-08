// Express aur JWT modules import kar rahe hain
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

// Middleware: cookie-parser ko use kar rahe hain taaki cookies read kar sakein
app.use(cookieParser());

// Route: "/" pe ek JWT token generate hoga aur browser me cookie ke form me save hoga
app.get("/", (req, res) => {
  // JWT token bana rahe hain jisme email store hai, secret key "tinkal" se sign kiya gaya
  let token = jwt.sign({ email: "email@email.com" }, "tinkal");
  
  // Console me token print kar rahe hain
  console.log("Generated Token:", token);
  
  // Token ko client ke browser me cookie ke through bhej rahe hain
  res.cookie("token", token);

  // Response bhej rahe hain
  res.send("Learning JWT");
});

// Route: "/read" pe hum browser se token read kar rahe hain aur usko verify kar rahe hain
app.get("/read", (req, res) => {
  // Cookie me se token nikal rahe hain aur verify kar rahe hain secret key ke saath
  let data = jwt.verify(req.cookies.token, "tinkal");

  // Token ke andar ka data print kar rahe hain (decoded info)
  console.log(data);

  // Response bhej rahe hain
  res.send("Token read from cookie");
});

// Server ko port 5000 pe chalu kar rahe hain
const PORT = 5000;
app.listen(PORT, () => {
  console.log("our server is running on", PORT);
});
