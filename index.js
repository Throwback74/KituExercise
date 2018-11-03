// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var axios = require('axios');

// Configure express and set up data parsing
var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

var users = [];

var url = 'https://randomuser.me/api';

// Send a request to retrieve 10 new random user records to be stored in memory
app.get('/users', function(req, res) {
  var count = users.length;
  for(var i = 0; i < 10; i++) {
  try {
    axios.get(url).then(function(response) {  
      var results = response.data.results[0];
        users.push({
          gender: results.gender,
          firstname: results.name.first,
          city: results.location.city,
          email: results.email,
          cell: results.cell
        });
    }).then(userList => {
      var newCount = users.length;
      if(newCount - count === 10) {
        res.status(200).send({
          success: true,
          message: users
          });
      } 
    }).catch(err => res.status(400).send(err));
  } catch (error) {
      console.log(error);
  }
}
});


// Create a new user record
app.post('/users', function (req, res) {
  users.push({
    gender: req.body.gender,
    firstname: req.body.firstname,
    city: req.body.city,
    email: req.body.email,
    cell: req.body.cell
  });
  return res.status(201).json({
    success: true,
    message: 'User successfully created!'
  });
});

// Replace ':firstname' with the name being searched for to return all matching records
app.get('/users/firstname/:firstname', function (req, res) {
  var name = req.params.firstname.toString().toLowerCase();
  var searchResults = [];
  for(var j = 0; j < users.length; j++) {
    var userSearch = (function (name, users) { 
      if(users[j].firstname === name) {
        return searchResults.push(users[j]);
      }
    })(name, users); 
  }
  if(searchResults === []) {
    return res.status(404).json({
      success: false,
      message: 'User not found!'
    });
  } else {
      return res.status(200).json({
        success: true,
        message: searchResults
      });
  }
});

// Extra Route for testing - displays what is currently in memory without obtaining new user records
app.get('/users/all', function(req, res) {
  res.json({
    success: true,
    message: users
  });
});

// Starts server listening
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});