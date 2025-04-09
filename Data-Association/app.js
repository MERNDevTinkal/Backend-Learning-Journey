const express = require("express");
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/post");

app.get("/", (req, res) => {
  res.send("learning data association");
});

app.get("/create", async (req, res) => {
  let createdUser = await userModel.create({
    userName: "Tinkal",
    email: "Tinkal@gmail.com",
    age: "22",
    posts: [],
  });
  res.send(createdUser);
});

app.get("/post/create", async (req, res) => {
  let postcreated = await postModel.create({
    postdata: "hello tinkal",
    user: "67f628764d47a82662b06fa8",
  });
  let user = await userModel.findOne({ _id: "67f628764d47a82662b06fa8" });
  user.posts.push(postcreated._id);
  await user.save();
  res.json({ postcreated, user }); 
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started on port`, PORT);
});
