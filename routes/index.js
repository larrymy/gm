var express = require("express");
var router  = express.Router();

var mongoose = require("mongoose");

// var underscore = require("../public/script/underscore.js");

var Supplier = require("../models/supplier");
var Upload = require("../models/upload.js");
var Order = require("../models/order.js");
// var middleware = require("../middleware");
var moment = require("moment");
var async = require("async");

router.get("/", function(req,res){
	res.redirect("/admin_upload_json");
})

router.get("/admin_upload_json", function(req, res){
	res.render("./upload_json.ejs", {moment:moment});
})


router.get("/login", function(req,res){
	res.render("login");
})


router.get("/admin_orders", function(req,res){

	Upload.findOne().sort({date_created:-1}).exec(function(err,post){
		if(!post){
			res.redirect("/admin_upload_json");
		}
		
		Order.find({}).sort({order_date: -1}).exec(function(err,data2){
			res.render("admin_orders_3.ejs", {orders: data2, moment: moment});
		})	
		
	})
})

router.get("/admin_suppliers", function(req, res){
	Supplier.find({}, function(err, allsupp){
		res.render("./supplier_list.ejs", {suppliers: allsupp});
	})
})

router.get("/supplier/:id", function(req, res){

	Upload.findOne().sort({date_created:-1}).exec(function(err,post){
		Supplier.findById(req.params.id, function(err, supp){
			// console.log(supp);
			Order.find({}).sort({order_date: -1}).exec(function(err,data2){
				res.render("./supplier_orders.ejs", { orders: data2, supp: supp, moment: moment });
			})
		})	
	})
})

router.get("/admin_uploads", function(req,res){
	Upload.find({}, function(err, ups){
		res.render("upload_list.ejs", {uploads: ups, moment: moment});
	})
});

module.exports = router;



