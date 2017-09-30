var express = require("express");
var router  = express.Router();

var mongoose = require("mongoose");
var passport = require("passport");

var User = require("../models/user.js");
var Supplier = require("../models/supplier.js");
var Upload = require("../models/upload.js");
var Order = require("../models/order.js");
var middleware = require("../middleware");
var moment = require("moment");
var async = require("async");
flash       = require("connect-flash");


router.get("/", function(req,res){
	res.redirect("/admin_upload_json");
})

router.get("/login", function(req,res){
	res.render("login");
})


router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true
    }), function(req, res){

});

// logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "See you next time ...");
    res.redirect("/");
});



router.get("/admin_upload_json", middleware.isLoggedIn, function(req, res){
	res.render("./upload_json.ejs", {moment:moment});
})

router.get("/admin_orders", middleware.isLoggedIn, function(req,res){

	Upload.findOne().sort({date_created:-1}).exec(function(err,post){
		if(!post){
			res.redirect("/admin_upload_json");
		}
		
		Order.find({}).sort({order_date: -1}).exec(function(err,data2){
			res.render("admin_orders_3.ejs", {orders: data2, moment: moment});
		})	
		
	})
})

router.get("/driver/a20b17", function(req,res){

	Upload.findOne().sort({date_created:-1}).exec(function(err,post){
		if(!post){
			res.redirect("/admin_upload_json");
		}
		
		Order.find({}).sort({order_date: -1}).exec(function(err,data2){
			res.render("driver.ejs", {orders: data2, moment: moment});
		})	
		
	})
})

router.get("/admin_suppliers", middleware.isLoggedIn, function(req, res){
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

router.get("/admin_uploads", middleware.isLoggedIn, function(req,res){
	Upload.find({}, function(err, ups){
		res.render("upload_list.ejs", {uploads: ups, moment: moment});
	})
});

// show register form
router.get("/register", function(req, res){
   res.render("register"); 
});

//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            req.flash("error", err.message);
            res.redirect ("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to GM Admin Dashboard, " + user.username);
           res.redirect("/"); 
        });
    });
});



module.exports = router;



