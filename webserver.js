// Mongoose import
var mongodb = require('mongodb');
var express = require('express');


var Server = mongodb.Server,
    Db = mongodb.Db,
    BSON = mongodb.BSONPure;
var collection;
    var server = new Server('localhost', 27017, {auto_reconnect: true});
    db = new Db('redbox', server);
    console.log("Opening Database...");
    
    db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'testdb' database");
          collection = db.collection('testData');
    }                
    else
        {console.log(err);}
});


var app = express();

app.use(function(req,res,next){
  var _send = res.send;
  var sent = false;
  res.send = function(data){
    if(sent) return;
    _send.bind(res)(data);
    sent = true;
};
  next();
});



app.get('/',function(req,res){
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.send("Welcome to REDBOX Data Server");
});

app.get('/data',function(req,res){
res.setHeader('Content-Type', 'text/plain');
  collection.find({}).toArray(function (err, result) {
      if (err) {
        console.log(err);
      } else if (result.length) {
          result.forEach(function(doc) {
            res.json(doc);
        });
      } else {
        console.log('No document(s) found with defined "find" criteria!');
      }
    });
});



app.get('/all',function(req,res){
   collection.find({}).toArray(function (err, result) {
      if (err) {
        console.log(err);
          res.status(500).send(err);
      } else if (result.length) {
        //console.log('Found:', result);
          res.send(result);
      } else {
        console.log('No document(s) found with defined "find" criteria!');
      }
    });
});

app.get('/stat/:val',function(req,res){
    var value = req.params.val;
   collection.find({stat: value}).toArray(function (err, result) {
      if (err) {
        console.log(err);
          res.status(500).send(err);
      } else if (result.length) {
          res.send(result);
      } else {
        console.log('No document(s) found with defined "find" criteria!');
      }
    });
});

app.get('/speed/:val',function(req,res){
    var value = req.params.val;
   collection.find({sped: value}).toArray(function (err, result) {
      if (err) {
        console.log(err);
          res.status(500).send(err);
      } else if (result.length) {
          res.send(result);
      } else {
        console.log('No document(s) found with defined "find" criteria!');
      }
    });
});

app.get('/fuel/:val',function(req,res){
    var value = req.params.val;
   collection.find({fcon: value}).toArray(function (err, result) {
      if (err) {
        console.log(err);
          res.status(500).send(err);
      } else if (result.length) {
          res.send(result);
      } else {
        console.log('No document(s) found with defined "find" criteria!');
      }
    });
});

app.get('/engine/:val',function(req,res){
    var value = req.params.val;
   collection.find({emod: value}).toArray(function (err, result) {
      if (err) {
        console.log(err);
          res.status(500).send(err);
      } else if (result.length) {
          res.send(result);
      } else {
        console.log('No document(s) found with defined "find" criteria!');
      }
    });
});

app.get('/date/:val',function(req,res){
    var value = req.params.val;
   collection.find({date: value}).toArray(function (err, result) {
      if (err) {
        console.log(err);
          res.status(500).send(err);
      } else if (result.length) {
          res.send(result);
      } else {
        console.log('No document(s) found with defined "find" criteria!');
      }
    });
});



// http://localhost:8080/api/users?id=4&token=sadsf4&geo=us
app.get('/find', function(req, res) {
    var stat = req.param('stat');
    var emod = req.param('emod');
    var fcon = req.param('fcon');
    var sped = req.param('sped');
    collection.find({stat: stat,emod:emod,fcon:fcon,sped:sped}).toArray(function (err, result) {
      if (err) {
        console.log(err);
          res.status(500).send(err);
      } else if (result.length) {
          res.send(result);
      } else {
        console.log('No document(s) found with defined "find" criteria!');
      }
    });
    //res.send(stat + ' ' + emod + ' ' + fcon+ ' ' + sped);
});


app.get('/count',function(req,res){
//res.setHeader('Content-Type', 'text/plain');
  collection.count(function(err, count) {
          console.log("There are " + count + " records.");
          res.json("There are " + count + " records.");
        });
});


app.get('*',function(req,res){
   res.send("BAD ROUTE.."); 
});

var server = app.listen(3000,function(){
    console.log("Listining on port 3000.");
});


