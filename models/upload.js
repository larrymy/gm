var mongoose = require("mongoose");

var uploadSchema = mongoose.Schema({
    originalname: String,
    filename: String,
    content: String,
    path: String,
    extension: String,
    size: Number,
    size_readable: String,
    start_date: Date,
    end_date: Date,
        date_created: { type: Date, default: Date.now }
    
});

module.exports = mongoose.model("Upload", uploadSchema);