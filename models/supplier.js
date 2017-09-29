var mongoose = require("mongoose");

var supplierSchema = new mongoose.Schema(
    {
        name: String, 
    }
);

var Supplier = mongoose.model('Supplier', supplierSchema, 'supplier');

module.exports = Supplier;