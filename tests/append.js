var parasite = require(__dirname+"/../lib/main.js");

var sys = require('sys');

var sites = {"www.google.com" : ["/news", "/images", "/finance"]};

sys.puts(sys.inspect(parasite));

var requestGroup = parasite(sites);

requestGroup.on("response", function(response){
   console.log("individual responses", response);
});


requestGroup.on("end", function(responseTree){
   console.log("omg response tree", responseTree);
});
