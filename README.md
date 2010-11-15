SpecStorm
==========

SpecStorm allows you to run your selenium tests concurrently (at the file-level) without colliding with one another, and with almost no changes to your current rspec selenium specs. It hashes each spec file and then uses the hash as a database prefix, giving us a nice namespacing mechanism. It auto-patches rails' link-generation to append a db_prefix parameter, and dynamically resets the prefix on each request.

It also includes an rspec helper that patches the Selenium Driver class to calculate the db prefix, and will automatically append it to any "open" command.

To read more about setting up Specstorm and its use cases, please read the original post on [Sauce Lab's blog](http://saucelabs.com/blog/index.php/2010/02/specstorm-for-rails-or-running-your-selenium-specs-in-parallel-124-at-a-time)

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
    
    requestGroup.addListener('each', function(response){
       console.log("act on individual respones here", response);
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