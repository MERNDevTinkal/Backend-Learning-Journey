const express = require("express");
const app = express();
const userModel = require("./models/user");
const path = require("path");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const postModel = require("./models/post");
const upload = require("./config/multerConfig");

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

app.get("/profile", isLoggedIn, async (req, res) => {
 // console.log(req.user);
 let user = await userModel.findOne({ email: req.user.email }).populate("posts");
 // console.log(user);
  res.render("profile" , {user});
});

app.post("/post", isLoggedIn, async (req, res) => {

    let user = await userModel.findOne({email:req.user.email});

    let {content} = req.body ;

  let post = await  postModel.create({
        user : user._id,
        content,
    })
    user.posts.push(post._id);
    await user.save();
    res.redirect("/profile");
   });

   app.get("/like/:id", isLoggedIn, async (req, res) => {
    try {
      const post = await postModel.findOne({ _id: req.params.id });
  
      if (!post) return res.status(404).send("Post not found");
  
      const userId = req.user.userid.toString();
      const index = post.likes.indexOf(userId);
  
      if (index === -1) {
        post.likes.push(userId); // Like
      } else {
        post.likes.splice(index, 1); // Unlike
      }
  
      await post.save();
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong in like");
    }
  });
  
  app.get("/edit/:id", isLoggedIn, async (req, res) => {
    let post = await postModel.findOne ({ _id: req.params.id }).populate("user");
    res.render("edit" , {post});
  });

  app.post("/update/:id", isLoggedIn, async (req, res) => {
    let post = await postModel.findOneAndUpdate ({ _id: req.params.id }, {content : req.body.content});
    res.redirect("/profile");
  });

  app.get("/profile/upload", (req, res) => {
    res.render("profileUpload");
  });

  app.post("/upload", isLoggedIn, upload.single("image"), async (req, res) => {
   let user = await userModel.findOne({email : req.user.email});
   user.profilepic = req.file.filename;
  await user.save();
  res.redirect("/profile");
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
      res.redirect("/login")
     // res.send("Hello User, You are registered now");
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

      res.status(200).redirect("/profile");


    } else res.redirect("/login");
  });
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/login");
});

function isLoggedIn(req, res, next) {
    if (!req.cookies.token || req.cookies.token === "") return res.redirect("/login");
  
    const data = jwt.verify(req.cookies.token, "Tinkal");
    req.user = data;
    next();
  }
  
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
