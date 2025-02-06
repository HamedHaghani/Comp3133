const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, 
    username: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true }, 
    createdOn: { type: String, default: new Date().toLocaleString() } 
});

module.exports = mongoose.model("User", userSchema);
