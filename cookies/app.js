const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

app.use(cookieParser());

app.get("/", (req, res) => {
  res.cookie("name","tinkal");
  res.send("done");
});

app.get("/read",(req,res)=>{
    res.send("this is read page chaking cookies");
    console.log(req.cookies);

})


const PORT = 5000;
app.listen(PORT,()=>{
    console.log("owr server is running on",PORT);
})
