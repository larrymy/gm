var mongoose = require("mongoose");

var ProductCategorySchema = new mongoose.Schema(
    {
        product_id: String,
        food_name: String,
        category: String
    }
)
var ProductCategory = mongoose.model('ProductCategory', ProductCategorySchema, 'allproducts');
module.exports = ProductCategory;