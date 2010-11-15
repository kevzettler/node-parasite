var sys = require('sys'),
    http = require('http');
   
function parasite(sites){
    var response_tree = {},
    count = 0,
    totalassets = 0;
      
   eventObj = { 
     _listeners : {},
     addListener: function(type, listener){
              if (typeof this._listeners[type] == "undefined"){
                  this._listeners[type] = [];
              }
              this._listeners[type].push(listener);
      },
      fire: function(event, params){
         if (typeof event == "string"){
              event = { type: event };
         }

         if (!event.target){
            event.target = this;
         }

         if (!event.type){  //falsy
             throw new Error("Event object missing 'type' property.");
         } 

         if (this._listeners[event.type] instanceof Array){
             var listeners = this._listeners[event.type];
             for (var i=0, len=listeners.length; i < len; i++){
                 //listeners[i].call(this, event);
                 listeners[i].call(this, params)
             }
         }   
       }
   } 
   function addListener(type, listener){
           if (typeof this._listeners[type] == "undefined"){
               this._listeners[type] = [];
           }
           this._listeners[type].push(listener);
   }
       
    //iterate over the mxhr_tree and call each url 
    for (var site in sites){
      response_tree[site] = {};
      //create a closure to pair the asset with the asynch procedure
      (function(site){
        for(var i=0; i<sites[site].length; i++){(function(i){
          totalassets++;
          response_tree[site][sites[site][i]] = '';
      
          var rep_data = '',
              httpClient = http.createClient(80, site), //create a httpClient for each site
              httpC_req = httpClient.request('GET', sites[site][i], {'host' : site}); //use the httpClient to request the assets url

          httpC_req.addListener('response', function(response){
            if (response.headers['content-type'] && response.headers['content-type'].match('image')) { //images have to be encoded to binary
              response.setEncoding('binary');
            }
          
            response.addListener('data', function(chunk){
              rep_data += chunk;            
            });
          
            response.addListener('end', function(){
              response_tree[site][sites[site][i]] = rep_data;
              //fire the listener for each
              eventObj.fire('each', [rep_data]); 
              count++;

              if(count == totalassets){
                httpC_req.end();
                eventObj.fire("end", [rep_data]);
                //sys.puts(sys.inspect(response_tree));
                //fire the all hook
              }
            
            });//end of the response 'end' listener
          });//end of the httpC_req 'response' listener
        
          httpC_req.end(); //if we get here make sure to kill the httpC_req   
        })(i)} //call closure for the site iterator
      })(site); //call the closure for site
     }
     sys.puts(sys.inspect(this));
     return  eventObj;
} 

module.exports = parasite;

  