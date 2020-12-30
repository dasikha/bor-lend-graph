var express = require('express');
var router = express.Router();
const db = require("../model/helper");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get("/", (req, res) => {
  res.send("Welcome to the API");
});

router.get("/categories", (req, res) => {
  // Send back the full list of items
  db("SELECT * FROM category ORDER BY category_name ASC;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

router.get("/contacts", (req, res) => {
  // Send back the full list of items
  db("SELECT id, name FROM contacts ORDER BY name ASC;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

module.exports = router;
