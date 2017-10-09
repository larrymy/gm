var mongoose = require("mongoose");
var Upload = require("../models/upload.js");
var Ord = require("../models/order.js");

module.exports = function(app){
	var multer = require("multer");
	var upload = multer({dest: __dirname+"/uploads"});

	app.post("/uploads", upload.single('myfile'), uploadFile);

	function humanFileSize(bytes, si) {
	    var thresh = si ? 1000 : 1024;
	    if(Math.abs(bytes) < thresh) {
	        return bytes + ' B';
	    }
	    var units = si
	        ? ['kB','MB','GB','TB','PB','EB','ZB','YB']
	        : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
	    var u = -1;
	    do {
	        bytes /= thresh;
	        ++u;
	    } while(Math.abs(bytes) >= thresh && u < units.length - 1);

	    return bytes.toFixed(1)+' '+units[u];
	}

	function uploadFile(req, res){
		if( !req.file ){
			req.flash("error", "Please upload an appropriate JSON file.");
			res.redirect("/admin_upload_json");
		}
		var wigetId = req.body.widgetId;
		var width = req.body.width;
		var myfile = req.file;

		myfile.extension = myfile.originalname.split('.').pop().toLowerCase()
		myfile.size_readable = humanFileSize(myfile.size,true);
	
		var fs=require('fs');
		var data=fs.readFileSync(myfile.path);
		var order_data=JSON.parse(data);
		// res.send(order_data);
		Ord.find({}).remove().exec(function(err,done){});

		Ord.create(order_data, function(err, orders){
		})

		Upload.create(myfile, function(err, newUpload){
			if(err){
	            console.log(err);
	        } else {

	            res.redirect("/admin_uploads")
	        }
		})
	}
}