var express = require("express");
var router  = express.Router();

var mongoose = require("mongoose");
var Order = require("../models/order");
var ProductCategory = require("../models/category");
var Supplier = require("../models/supplier");
var Upload = require("../models/upload.js");
var Ord = require("../models/order2.js");
// var middleware = require("../middleware");
var moment = require("moment");
var async = require("async");
//noob way - convert not flatten mongodb to flatten mongodb

var all_orders = [];


var orders = [];
var categories = [];
var suppliers = [];

Order.find({}, function(err, aa){
	aa.forEach(function(bb){
		orders.push(bb);
	})
})

ProductCategory.find({}, function(err, zz){
	zz.forEach(function(ss){
		categories.push(ss);
	})
})

Supplier.find({}, function(err, qq){
	qq.forEach(function(ww){
		suppliers.push(ww);
	})
})

		function slugify(text)
		{
		  return text.toString().toLowerCase()
		    .replace(/\s+/g, '-')           // Replace spaces with -
		    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
		    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
		    .replace(/^-+/, '')             // Trim - from start of text
		    .replace(/-+$/, '');            // Trim - from end of text
		}
		function fix_key(key) { return slugify(key); }


///TEMPTMEPMTPEMPTEMP////
router.get("/", function(req,res){
	res.redirect("/admin_orders");
})

router.get("/login", function(req,res){
	res.render("login");
})


router.get("/admin_orders", function(req,res){

	Upload.findOne().sort({date_created:-1}).exec(function(err,post){

		var fs=require('fs');
		var data=fs.readFileSync(post.path);
		var words=JSON.parse(data);
		// res.send(words);
		Ord.find({}).remove().exec(function(err,done){});

		Ord.create(words, function(err, data2){
			// res.send(data2);
			res.render("temp3.ejs", {orders: data2});
		})
	})
	// Ord.find({}, function(err, ordersq){
	// 	// console.log(ordersq);
	// 	res.send(words);
	// 	// res.render("temp3.ejs", {orders: ordersq})
			
	// })
})

router.get("/admin_suppliers", function(req, res){
	Supplier.find({}, function(err, allsupp){
		res.render("./supplier_list.ejs", {suppliers: allsupp});
	})
})

router.get("/supplier/:id", function(req, res){

	Upload.findOne().sort({date_created:-1}).exec(function(err,post){

		var fs=require('fs');
		var data=fs.readFileSync(post.path);
		var words=JSON.parse(data);
		// res.send(words);
		Ord.find({}).remove().exec(function(err,done){});

		Supplier.findById(req.params.id, function(err, supp){
			console.log(supp);
			Ord.create(words, function(err, data2){
				res.render("./supplier.ejs", {orders: data2, supp: supp, moment: moment });
			})
		})	
	})



})

router.get("/admin_uploads", function(req,res){
	Upload.find({}, function(err, ups){
		res.render("uploads", {uploads: ups, moment: moment});
	})
});

router.get("/uploads/:id", function(req,res){
	res.json("/uploads/" + req.params.id);
});


router.get("/admin_upload_json", function(req, res){
	// console.log(categories);
	res.render("./index3.ejs", {moment:moment});
	// Order.aggregate(
	// 	[
			
	// 		{
	// 			"$replaceRoot": { newRoot: "$order" }
	// 		// }
	// 		},
	// 		{
	// 			"$unwind": "$line_items"
	// 		}
			

	// 	], function(err, docs){
	// 		if(err){
	// 			console.log(err)
	// 		}else{
	// 			var k = JSON.stringify(docs);
	// 			var k = JSON.parse(k);
	// 			console.log(docs[1]);
	// 			// res.json(docs)
	// 			res.render("./index3.ejs", {orderq: k, moment:moment});
	// 		}
	// });

	
})

// router.post("/", function(req,res){
	
// })


//INDEX - show all orders
router.get("/orders2", function(req, res){

	console.log(all_orders.length)	

	res.render("./index.ejs", {all_orders: all_orders, moment: moment});	


})

router.get("/orders", function(req, res){

// var orders, categories, suppliers;

  //  async.series([function(callback){
  //      Order.find({}).exec(function(err,allnM){
  //          if(err) return callback(err);
  //          orders = allnM;
  //          callback(null,allnM);
  //      })
  //  },function(callback){
  //      ProductCategory.find({}, function(err, allcg){
  //          categories = allcg;
  //          callback(null,allcg);
  //      })
  //  },function(callback){
		// Supplier.find({}, function(err, alls){
  //          if(err) return callback(err);
  //          suppliers = alls;
  //          callback(null,alls);
  //      })

  //  }
  //  ],function(err){
		// res.render("./index2.ejs", {orders: orders, categories:categories, suppliers: suppliers, moment: moment});	
  //  });
// if(orders.length > 0 && categories.length >0 && suppliers.length >0){
   res.render("./index2.ejs", {orders: orders, categories:categories, suppliers: suppliers, moment: moment});	
// }else{
// 	setTimeout(function(){
//     //do what you need here
//     res.redirect("/supplier")
// 	}, 3);
	
// }

})





module.exports = router;





// var orders, categories, suppliers;

  //  async.series([function(callback){
  //      Order.find({}).exec(function(err,allnM){
  //          if(err) return callback(err);
  //          orders = allnM;
  //          callback(null,allnM);
  //      })
  //  },function(callback){
  //      ProductCategory.find({}, function(err, allcg){
  //          categories = allcg;
  //          callback(null,allcg);
  //      })
  //  },function(callback){
		// Supplier.find({}, function(err, alls){
  //          if(err) return callback(err);
  //          suppliers = alls;
  //          callback(null,alls);
  //      })

  //  }
  //  ],function(err){
		// orders.forEach(function(orderq){ 
		// 	orderq['order']['line_items'].forEach(function(food2){ 
				
		// 		var food = {};
		// 		food['order_id'] = orderq['order'].id;
		// 		food['date'] = moment(orderq.order.created_at).format('llll');
		// 		food['name'] = orderq['order']['billing_address'].first_name + ", " + orderq['order']['billing_address'].last_name;
		// 		food['email'] = orderq['order']['billing_address'].email ;
		// 		food['phone'] = orderq['order']['billing_address'].phone;
		// 		food['postcode'] = orderq['order']['billing_address'].postcode ;
		// 		food['address'] = orderq['order']['billing_address'].address_1;


		// 		food['food_id'] = food2.product_id ;
	

		// 		function findID(fruit) { 
		// 			return fruit.product_id == food2.product_id;
		// 		}; 
		// 		function splitt(str){
		// 				var arr = str.split("|");
						
		// 				return(arr.sort(function (a, b) { return b.length - a.length })[arr.length-1]);
		// 		};


		// 			var cate1 = categories.find(findID) || "";
		// 			cate1 = String(cate1.category);
		// 			food['category'] = splitt(cate1);

		// 		function findsupplierID(supp) { 
		// 			return supp.name == food['category'];
		// 		}; 		
		// 			var tempsupp = suppliers.find(findsupplierID) || "";
		// 		 	food['supplier_id'] = tempsupp._id; 
		// 			// food['supplier_id'] = suppliers;

		// 			food['food_name'] = food2.name;
		// 			food['food_qty'] = food2.quantity;
		// 			food['food_price'] = food2.price;
		// 			food['food_total'] = food2.total;
		// 			food['order_remarks'] = orderq['order'].note;
		// 			food['order_url'] = "http://gastronomeal.com/my-account/view-order/" + orderq['order'].id;
		// 			all_orders.push(food);
		// 	})
		// })
  //  });



// Order.find({}, function(err, orders){
// 	ProductCategory.find({}, function(err, categories){
// 	Supplier.find({}, function(err, suppliers){

// 		orders.forEach(function(orderq){ 
// 			orderq['order']['line_items'].forEach(function(food2){ 
				
// 				var food = {};
// 				food['order_id'] = orderq['order'].id;
// 				food['date'] = moment(orderq.order.created_at).format('llll');
// 				food['name'] = orderq['order']['billing_address'].first_name + ", " + orderq['order']['billing_address'].last_name;
// 				food['email'] = orderq['order']['billing_address'].email ;
// 				food['phone'] = orderq['order']['billing_address'].phone;
// 				food['postcode'] = orderq['order']['billing_address'].postcode ;
// 				food['address'] = orderq['order']['billing_address'].address_1;


// 				food['food_id'] = food2.product_id ;
	

// 				function findID(fruit) { 
// 					return fruit.product_id == food2.product_id;
// 				}; 
// 				function splitt(str){
// 						var arr = str.split("|");
						
// 						return(arr.sort(function (a, b) { return b.length - a.length })[arr.length-1]);
// 				};


// 					var cate1 = categories.find(findID) || "";
// 					cate1 = String(cate1.category);
// 					food['category'] = splitt(cate1);

// 				function findsupplierID(supp) { 
// 					return supp.name == food['category'];
// 				}; 		
// 					var tempsupp = suppliers.find(findsupplierID) || "";
// 				 	food['supplier_id'] = tempsupp._id; 
// 					// food['supplier_id'] = suppliers;

// 					food['food_name'] = food2.name;
// 					food['food_qty'] = food2.quantity;
// 					food['food_price'] = food2.price;
// 					food['food_total'] = food2.total;
// 					food['order_remarks'] = orderq['order'].note;
// 					food['order_url'] = "http://gastronomeal.com/my-account/view-order/" + orderq['order'].id;
// 					all_orders.push(food);
// 			})
// 		})
// 	})
// 	})
// })
