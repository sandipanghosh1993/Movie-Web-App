var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var fdata = {};
var bodyParser = require("body-parser");
var Movies = require(".././models/movieschema");

var requestify=require('requestify');

mongoose.connect('mongodb://localhost/users')
var db = mongoose.connection;

router.get('/', function (req, res) {

    db.on("error", console.error.bind(console, "Connection Error:"));
    db.open('open', function(){
      Movies.find({}, function(err, data){
        res.send(data);
      });
    });
});

router.post('/', function (req, res){

db.on("error", console.error.bind(console, "Connection Error:"));
db.open('open', function(){
  Movies.find({'title':req.body.name}, function(err, data){
    fdata = data;
    res.send(fdata);
  });
});
});

router.post('/update', function (req, res){

  db.on("error", console.error.bind(console, "Connection Error:"));
  db.open('open', function(){
  if(req.body.update=='title')
  {
    Movies.update({'title':req.body.title},
     {$set:{'title':req.body.newval}},{multi:true}, function(err, data){
        if (err) throw err;
        res.send('updated');
    });
  }
  else if(req.body.update=='year')
  {
    Movies.update({'title':req.body.title},
     {$set:{'year':req.body.newval}},{multi:true}, function(err, data){
        if (err) throw err;
        res.send('updated');
    });
  }
  else if(req.body.update=='rated')
  {
    Movies.update({'title':req.body.title},
     {$set:{'rated':req.body.newval}},{multi:true}, function(err, data){
        if (err) throw err;
        res.send('updated');
    });
  }
  else if(req.body.update=='released')
  {
    Movies.update({'title':req.body.title},
     {$set:{'released':req.body.newval}},{multi:true}, function(err, data){
        if (err) throw err;
        res.send('updated');
    });
  }
  else if(req.body.update=='runtime')
  {
    Movies.update({'title':req.body.title},
     {$set:{'runtime':req.body.newval}},{multi:true}, function(err, data){
        if (err) throw err;
        res.send('updated');
    });
  }
});
});


router.put('/', function(req, res) {

  requestify.get("http://www.omdbapi.com/?t="+req.body.name+"&y=&plot=full&r=json").then(function(res1){

   var Movies = new Movies();

   Movies.title=res1.getBody().Title;
   Movies.year=res1.getBody().Year;
   Movies.rated=res1.getBody().Rated;
   Movies.released=res1.getBody().Released;
   Movies.runtime=res1.getBody().Runtime;

    Movies.save(function(err) {
      if (err) throw err;
      res.send('inserted!');
    });
  });
});

  router.delete('/', function(req, res) {
    db.on("error", console.error.bind(console, "Connection Error:"));
    db.open('open', function(){
      Movies.remove({'title':req.body.name}, function(err, data){
        res.send(data);
      });
    });
  });

module.exports = router;
