var fs = require("fs");

var path = 'C:/Users/jy/Desktop/test_gm/workspace/uploads/9a6b540be486aa53ae9e63af86872557';

// var data = fs.readFileSync();
var csv = require('csv-parser')
var fs = require('fs')

fs.createReadStream(path)
  .pipe(csv())
  .on('data', function (data) {
  	var h = JSON.stringify(data);

    console.log(JSON.parse(h))
  })