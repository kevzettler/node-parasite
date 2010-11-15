var parasite = require(__dirname+"/../lib/main.js");

var sites = {"www.google.com" : ["/news", "/images", "/finance"]};

var requestGroup = parasite(sites);

requestGroup.addListener("each", function(response){
   console.log("individual responses", response);
});


requestGroup.append({
  "www.yahoo.com" : ["/news", "/games", "/autos"]
});

requestGroup.addListener("end", function(responseTree){
   console.log("omg response tree", responseTree);
});


requestGroup.append({
  "www.aol.com" : ["/news", "/games", "/video"]
});