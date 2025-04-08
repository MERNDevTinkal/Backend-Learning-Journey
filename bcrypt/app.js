const express = require("express");
const app = express();
const bcrypt = require('bcrypt');

 /* bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        // Store hash in your password DB.
    });
});

this is code for password hashing 

app.get("/", (req, res) => {
    
  // Load hash from your password DB.
bcrypt.compare("Tinkal", "hashedpassword", function(err, result) {
    // result == true
    console.log(result);
});

});

*/

app.get("/", (req, res) => {
    
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash("Tinkal", salt, function (err, hash) {
      // Store hash in your password DB.
      console.log(hash);
    });
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log("owr server is running on", PORT);
});
