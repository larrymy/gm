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
		if(!req.file){
			req.flash("error", "Please upload an appropriate JSON file.");
			res.redirect("/admin_upload_json");
		}
		var wigetId = req.body.widgetId;
		var width = req.body.width;
		var myfile = req.file;

		myfile.extension = myfile.originalname.split('.').pop().toLowerCase()
		myfile.size_readable = humanFileSize(myfile.size,true);
		// var originalname = myfile.originalname;
		// var filename = myfile.filename;
		// var path = myfile.path;
		// var destination = myfile.destination;
		// var size = myfile.size;
		// var mimetype = myfile.mimetype;
		var Papa = require("papaparse");
		var csv = require('csv-parser')
		var fs = require('fs')
		var path = myfile.path;

		fs.createReadStream(path)
		  .pipe(csv())
		  .on('data', function (data) {
		  	var h = JSON.stringify(data);

		    Ord.find({}).remove().exec();
		    Ord.create(JSON.parse(h))
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