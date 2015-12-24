var express = require('express');
var mongoose = require('mongoose');
var flats = require("./flats");

var app = express();


// Use html and css in public
app.use(express.static(__dirname+"/public"));


// Let's start defining some routes

// Home page
app.get("/",function(req,res){
  res.sendFile(__dirname+"/public/index.html");
});

// Get all the flats from :page of Kijiji
app.get("/flats/kijiji/:page",flats.kijiji);


// "Page you're looking for can't be found"
app.get("*",function(req,res){
  res.sendFile(__dirname+"/public/404.html");
});



var port = 3000;

app.listen(port,function(){
  console.log("server is running on port",port);
});
