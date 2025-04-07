import express from 'express'

const app = express()

app.use(function(req,res,next){
    console.log("middleware fuction running");
    next();
});



app.get('/', (req, res) => {
  res.send('Hello World')
})

app.use(function(req,res,next){
    console.log("Tinkal middleware function running");  
    next();
})

app.get('/Tinkal', (req, res, next) => {
    // res.send('Hello World, Mr. Tinkal!')
    return next(new Error("Not Implemented"));  
  });

  app.use((err,req,res,next)=>{
    console.error(err.stack)
    res.status(500).send("something is wrong");
  })

app.listen(3000)