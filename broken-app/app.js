const express = require('express');
const ExpressError = require("./expressError");
let axios = require('axios');
var app = express();

app.use(express.json());

function getUsers(userIn) {
  let users = userIn.map(async userData => {
    res = await axios.get(`https://api.github.com/users/${userData}`);
    paredUser = { bio: res.data.bio, name: res.data.name}
    console.log("paredUser", paredUser)
    return paredUser
  })
  users.then(function(response) {console.log(response)})
}

app.post('/', function(req, res, next) {
  try {
    //  req.body.developers // ['joelburton', 'elie']
    userIn = req.body.developers
    getUsers(userIn)
    // users // currently a promise 
    // return users.send(JSON.stringify(output));

  } catch(err) {
    next(err);
  }
});


/** 404 handler */

app.use(function (req, res, next) {
  return new ExpressError("Not Found", 404);
});

/** general error handler */

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({
    error: err.message,
  });
});

module.exports = app;

app.listen(3000);
console.log("listening on 3000")
