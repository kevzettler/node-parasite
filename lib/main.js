var EventEmitter = require('events').EventEmitter
  , http = require('http')
  , util = require('util')
  ;


function ParaClass(sites) {
  EventEmitter.call(this);
  this.sites = sites;
  this.totalassets = 0;
  this.count = 0;
  this.responseTree = {};
  this.startRequests();
}
util.inherits(ParaClass, EventEmitter);

function parasite(sites){
  return new ParaClass(sites);
}

ParaClass.prototype.startRequests = function() {
  var self = this;
  Object.keys(this.sites).forEach(function(domain) {
    var client = http.createClient(80, domain);

    for(var i=0; i<self.sites[domain].length; i++){ (function(i){
      self.totalassets += 1;
      var req = client.request('GET', self.sites[domain][i], {'host' : domain});
      
      if(!self.responseTree[domain]){
        self.responseTree[domain] = {}; 
      }
      
      if(!self.responseTree[domain][i]){
        self.responseTree[domain][self.sites[domain][i]] = {};
      }    
            
      req.on('response', function(response, i) {
        response.body = "";
        
        response.on('data', function(chunk){
          response.body += chunk;
        });
        
        response.on('end', function(){
           self.count += 1; 
           self.responseTree[domain][self.sites[domain][i]] = response;
           self.emit('response', response);
           if(self.count == self.totalassets){
             self.emit('end', self.responseTree);
           }
        });
        
      });
      req.end();
    })(i);}
  });
};

module.exports = parasite;