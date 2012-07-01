var parasite = require(__dirname+"/../lib/main.js");
var util = require('util');

var sites = {"www.google.com" : ["/news", "/images", "/finance"]};

var requestGroup = parasite(sites);

requestGroup.on("response", function(response){
   console.log("individual responses", response.body);
});

requestGroup.on("end", function(responseTree){
   console.log("omg response tree", util.inspect(responseTree));
});
