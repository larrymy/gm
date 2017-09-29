var Papa = require("papaparse");
var fs = require('fs');

	fs.readFile(myfile.path, 'utf8', function (err,data) {
	  if (err) {
	    return console.log(err);
	  }
	  var results = Papa.parse(data);
	  console.log(results);
	});