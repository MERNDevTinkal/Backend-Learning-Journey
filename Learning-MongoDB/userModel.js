// Mongoose ko import kar rahe hain (ye MongoDB ke sath kaam karne ke liye library hai)
const mongoose = require("mongoose");

// MongoDB server se connect ho rahe hain (localhost par chal raha hai, aur database ka naam hai 'mongopractice')
mongoose.connect(`mongodb://127.0.0.1:27017/mongopractice`);

// Ek schema define kar rahe hain, jo batata hai ki user ka data ka structure kaisa hoga
const userSchema = mongoose.Schema({
    name: String,        // User ka naam (String type ka hoga)
    userName: String,    // User ka unique username
    gmail: String        // User ka gmail address
});

// Schema ko model me convert kar ke export kar rahe hain, taki doosri files me bhi use kar saken
module.exports = mongoose.model("user", userSchema);
