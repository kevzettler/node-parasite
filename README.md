ParaSite
==========

ParaSite allows you to fetch multiple http requests asynchronously and in parallel. 

It supports events like "each", and "end" that allow you to act on the responses upon individual completion or total completion. 

Installation
============
    npm install parasite

Usage
=====

    var parasite = require('parasite'),
    sites = {
      "www.google.com" : ["/finance", "/images", "/news"],
      "www.yahoo.com" : ["/games", "/news", "/autos"]
    };
    
    requestGroup = parasite(sites);
    
    requestGroup.addListener('response', function(response){
       console.log("act on individual respones here", response.body);
    });
    
    requestGroup.addListener('end', function(responseTree){
       console.log("returns all the responses in an responseTree Object", responseTree)
    });

TODO
====
* Add support for redirect follow throughs
* Unit tests

license
======

released under the MIT license    


THANKS
======    

Sami Samhuri - for suggesting the use of nodes event emitters instead of custom hackery.