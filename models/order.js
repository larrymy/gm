var mongoose = require("mongoose");

// var orderrSchema = new mongoose.Schema(
//     {
   
 
//     }, { strict: false }
// );

var orderrSchema = new mongoose.Schema(
    {
    	// _id: Schema.Types.ObjectId,
   		order_number: String,
   		order_status: String,
   		order_date: Date,
		customer_note: String,
		// order_notes: String,
		// customer_ip_address: String,
		user_login: String,
		user_email: String,
		// user_role: String,
		// billing_first_name: String,
		// billing_last_name: String,
		billing_full_name: String,
		billing_address_1: String,
		billing_address_2: String,
		billing_postcode: String,
		billing_email: String,
		billing_phone: String,
		products: [
		{
			category: String,
			item_price: Number,
			qty: Number,
			// total: { '$add' : [ '$item_price', '$qty' ] },
			product_variation: String,
			name: String,
			line_id: Number
		}
		],
		order_subtotal: Number,
		order_total: Number,
		count_total_items: Number,
		count_unique_products: Number
    }
);


var Ord = mongoose.model('Ord', orderrSchema);



module.exports = Ord;
