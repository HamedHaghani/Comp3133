const mongoose = require("mongoose");

const groupMessageSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, 
    from_user: { type: String, required: true }, 
    room: { type: String, required: true }, 
    message: { type: String, required: true },
    date_sent: { type: String, default: new Date().toLocaleString() } 
});

module.exports = mongoose.model("GroupMessage", groupMessageSchema);
