var express = require("express");
var router  = express.Router();

var mongoose = require("mongoose");

var Supplier = require("../models/supplier");
var Upload = require("../models/upload.js");
var Ord = require("../models/order.js");
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
		var fs=require('fs');
		var data=fs.readFileSync(post.path);
		var words=JSON.parse(data);
		// res.send(words);
		Ord.find({}).remove().exec(function(err,done){});

		Ord.create(words, function(err, data2){
			// res.send(data2);
			res.render("admin_orders.ejs", {orders: data2});
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

		var fs=require('fs');
		var data=fs.readFileSync(post.path);
		var words=JSON.parse(data);
		// res.send(words);
		Ord.find({}).remove().exec(function(err,done){});

		Supplier.findById(req.params.id, function(err, supp){
			console.log(supp);
			Ord.create(words, function(err, data2){
				res.render("./supplier_orders.ejs", {orders: data2, supp: supp, moment: moment });
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



