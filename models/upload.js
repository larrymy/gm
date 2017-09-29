var mongoose = require("mongoose");

var uploadSchema = mongoose.Schema({
    originalname: String,
    filename: String,
    path: String,
    extension: String,
    size: Number,
    size_readable: String,
    date_created: { type: Date, default: Date.now }
    
});

module.exports = mongoose.model("Upload", uploadSchema);