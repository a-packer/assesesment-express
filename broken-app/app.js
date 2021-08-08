const express = require('express');
let axios = require('axios');
var app = express();

app.use(express.json()) // a method inbuilt in express to recognize the incoming Request Object as a JSON Object

app.post('/', function(req, res, next) {
  try {

    async function mapData(devReq) {
      devDataMap = devReq.map(async devlpr => {
        res = await axios.get(`https://api.github.com/users/${devlpr}`)  
        return ({name: res.data.name, bio: res.data.bio})
      })
      console.log("devDataMap", devDataMap) //  Promise { <pending> }
      return devDataMap
    }

    async function getMappedData(devReq) {
      let mappedData = await mapData(devReq)
      console.log("awaited mappedData", mappedData)  // Promise { <pending> }
      return mappedData
    }

    const devReq = req.body.developers
    devData = getMappedData(devReq)
    console.log(devData) //  Promise { <pending> }
    return res.send(JSON.stringify(devData));

  } catch(err) {
    next(err);
  }
});

/** general error handler */

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({
    error: err.message,
  });
});

app.listen(3000);














// const express = require('express');
// const ExpressError = require("./expressError");
// let axios = require('axios');
// var app = express();

// app.use(express.json());

// function getUsers(userIn) {
//   let users = userIn.map(async userData => {
//     res = await axios.get(`https://api.github.com/users/${userData}`);
//     paredUser = { bio: res.data.bio, name: res.data.name}
//     console.log("paredUser", paredUser)
//     return paredUser
//   })
//   users.then(function(response) {console.log(response)})
// }

// app.post('/', function(req, res, next) {
//   try {
//     //  req.body.developers // ['joelburton', 'elie']
//     userIn = req.body.developers
//     getUsers(userIn)
//     // users // currently a promise 
//     // return users.send(JSON.stringify(output));

//   } catch(err) {
//     next(err);
//   }
// });


// /** 404 handler */

// app.use(function (req, res, next) {
//   return new ExpressError("Not Found", 404);
// });

// /** general error handler */

// app.use((err, req, res, next) => {
//   res.status(err.status || 500);

//   return res.json({
//     error: err.message,
//   });
// });

// module.exports = app;

// app.listen(3000);
// console.log("listening on 3000")
