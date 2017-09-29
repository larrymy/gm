var mongoose = require("mongoose");

// var orderSchema = mongoose.Schema({
//     foodid: String, //can be multiple id - this should be array containing order details

//     customer: {
//         id: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "User"
//         },
//         username: String
//     },
//     date_created: { type: Date, default: Date.now }

// });


var productSchema = new mongoose.Schema(
    {
        product_id: String,
        name: String, 
        quantity: Number, 
        price: Number,
        total: Number,
        categories: [{
            id: String,
            name: String,
            slug: String
        }]
        // category: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "ProductCategory"
        // },
        // slug: String
    }
);



var gmSchema = new mongoose.Schema({
        _id: mongoose.Schema.ObjectId,
        order: {
            id: String,
            note: String,
            created_at: Date,
            currency: String,
            view_order_url:String,
            subtotal: Number,
            total_discount: Number,
            billing_address: {
                first_name: String,
                last_name: String,
                email: String,
                phone: String,
                postcode: String,
                address_1: String
            },
            line_items: [productSchema]
        },
        a: String
    });


var Order = mongoose.model('Order', gmSchema, 'gm');



module.exports = Order;



// var WooCommerceAPI = require('woocommerce-api');

// var WooCommerce = new WooCommerceAPI({
//   url: 'http://gastronomeal.com', // Your store URL
//   consumerKey: 'ck_b4c9d46092848933f066d750af09211194184e60', // Your consumer key
//   consumerSecret: 'cs_b52c34d2de94a82097332348d446a3a77f07ce27', // Your consumer secret
//   wpAPI: true, // Enable the WP REST API integration
//   version: 'wc/v2' // WooCommerce WP REST API version
// });

//  WooCommerce.get('products/', function(err, data, res) {
//         var obj = res;
//         var parse = JSON.parse(obj);

//         parse.forEach(function(order){
//                 console.log(order.id);
//                 console.log(order.categories);

//         } )
            
//             console.log("done")
//     });

// Product.find({}).populate().exec(function(err, prod){
//     // console.log(prod);
// });

// Order.find({}, function(err, prod){
//     prod.forEach(function(err, ord){
//         // console.log(ord);
//     })
// });

// var async = require("async");
// need fix

// Order.find({}, function(err, orders){
//     async.each(orders, function(orderq, next){
//         async.each(orderq['order']['line_items'], function(food, next){

//             prod_id = food.product_id;
//             var ff = WooCommerce.get('products/'+ prod_id, function(err, data, res) {
//                 // console.log(res['id']);
//                 var obj = res;
//                 var parse = JSON.parse(obj);
//                 food.categories = parse.categories;
//                 // food.category = parse.categories[1].slug;
//                 food.save(function(err,food){
//                      if(err) throw err;
//                          console.log(food);
                    
//                });
//             });
//         })
        
        
//     })
// })

// Order.find({}, function(err, orders){
//     orders.forEach(function(orderq){
//         orderq['order']['line_items'].forEach(function(food){
//             var prod_id = food.product_id;
//             // console.log(prod_id);
//             // var ff = WooCommerce.get('products/'+ prod_id, function(err, data, res) {
//             //     // console.log(res['id']);
//             //     var obj = res;
//             //     var parse = JSON.parse(obj);
//             //     food.categories = parse.categories;
//             //     // food.category = parse.categories[1].slug;
//             //     food.save(function(err,food){
//             //          if(err) throw err;
//             //              console.log(food);
                    
//             //    });

//             //     return(food.categories);
//             // });
//         })
//     })
// })

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));

// var order1 = db.once('open', function callback() {
//     var gmSchema = new mongoose.Schema({
//         _id: mongoose.Schema.ObjectId,
//         a: String
//     });
//     var Order = mongoose.model('Order', gmSchema, 'gm');
//     Order.find(function(err, orders){
//         if(err) return console.err(err);
//         // console.log(orders);
//     })

//     return Order;

// });

