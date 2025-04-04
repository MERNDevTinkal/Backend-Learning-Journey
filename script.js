const fs = require('node:fs');
/*
// Koi nayi file create karni ho ya existing file overwrite karni ho.

fs.writeFile("example.txt", "Hello, Tinkal! 🚀", (err) => {
  if (err) throw err;
  console.log("File Created & Data Written!");
});
// Existing file me data add karne ke liye.

fs.appendFile("example.txt", "\nNew Line Added!", (err) => {
    if (err) throw err;
    console.log("Data Appended!");
  });
  */
  //File se data read karne ke liye.
  // "utf8" dena zaroori hai warna buffer data aayega.
  fs.readFile("updatedTInkal.txt", "utf8", (err, data) => {
    if (err) throw err;
    console.log("File Content:", data);
  });

  // File ka naam change karne ke liye  
fs.rename("example.txt", "newname.txt", (err) => {
  if (err) throw err;
  console.log("File Renamed!");
});

// File delete karne ke liye.

fs.unlink("newname.txt", (err) => {
  if (err) throw err;
  console.log("File Deleted!");
});