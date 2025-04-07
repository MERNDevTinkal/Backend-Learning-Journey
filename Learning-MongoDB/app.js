// Express module ko import kar rahe hain (server banane ke liye)
const express = require("express");

// Express ka instance bana rahe hain
const app = express();

// Apna user model import kar rahe hain jisme MongoDB schema defined hai
const userModel = require("./userModel");

// Server kis port pe chalega, wo define kar rahe hain
const port = 3000;

// Home route - jab koi browser me "/" open karega to "Hello World!" dikhai dega
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Create route - ek new user create karega database me
app.get("/create", async (req, res) => {
  let createdUser = await userModel.create({
    name: "Tinkal",               // User ka naam
    userName: "TinkalKumar",      // Unique username
    gmail: "tinkal@gmail.com"     // Gmail address
  });
  res.send(createdUser);          // Create hone ke baad response me created user bhej rahe hain
});

// Update route - existing user ka name update karega
app.get("/update", async (req, res) => {
  let updatedUser = await userModel.findOneAndUpdate(
    { userName: "TinkalKumar" },        // Kis user ko dhoondhna hai
    { name: "TinkalTinkal" },           // Kya update karna hai
    { new: true }                       // Updated document ko return karna hai
  );
  res.send(updatedUser);
});

// Read route - sabhi users ko database se fetch karega
app.get("/read", async (req, res) => {
  let readUser = await userModel.find();  // Sabhi users ko find karega
  res.send(readUser);                     // Response me bhej dega
});

// Delete route - ek user ko delete karega
app.get("/delete", async (req, res) => {
  let deleteUser = await userModel.findOneAndDelete({ userName: "TinkalKumar" });
  res.send(deleteUser);  // Deleted user ko response me bhej rahe hain
});

// Server ko start kar rahe hain aur console me message dikhate hain
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
