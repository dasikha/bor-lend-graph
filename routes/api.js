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

router.get("/users/:id", (req, res) => {
  // Send back the full list of items
  db("SELECT id, name FROM users WHERE id = ?;", req.params.id)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

router.get("/categories", (req, res) => {
  // Send back the full list of items
  db("SELECT * FROM category ORDER BY category_name ASC;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

router.get("/contacts/:id", (req, res) => {
  // Send back the full list of items
  db("SELECT id, name FROM contacts WHERE user_id = ? ORDER BY name ASC;", req.params.id)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

//get loan data 
router.get("/loans/:id", (req, res) => {
  // Send back the full list of items
  db("SELECT * FROM loan WHERE id = ?;", req.params.id)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

//get loan data (summary)
//id = user id
//type = 'borrow' or 'lend'
router.get("/loans/summary/:id/:type", (req, res) => {
  // Send back the full list of items
  db("SELECT l.id, l.date, l.remarks, c.name, c.contact_number, l.initial_amount, l.status, "
   + "SUM(IFNULL(p.amount_paid,0)) AS totalpaid, "
   + "l.initial_amount - SUM(IFNULL(p.amount_paid, 0)) AS currentamount "
   + "FROM loan l LEFT JOIN payment p ON l.id = p.loan_id "
   + "INNER JOIN contacts c ON l.contact_id = c.id WHERE l.user_id = ? AND l.type = ?"
   + "GROUP BY l.id;",
    [req.params.id,req.params.type])
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

//get threshold status data
//ignore the threshold period and see if it is feasible without it or not
//logically we do not want people to accumate loans more than the limit regardless of the period
//if user want the threshold limited to the threshold period only then the API would be like:
///threshold/:id/:period (where period will get a value of yearly or mmonthly)
router.get("/threshold/:id/", (req, res) => {
  // Send back the full list of items
  db("select u.threshold_limit, sum(l.initial_amount), sum(ifnull(p.amount_paid,0)), sum(l.initial_amount) - sum(ifnull(p.amount_paid,0)) from users u inner join loan l on u.id = l.user_id inner join payment p on l.id = p.loan_id where u.id = ? and l.status = 'active' group by u.id ;", req.params.id)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

//insert a borrow loan info
router.post("/loans", function(req, res, next) {
  //your code here
  db("INSERT INTO loan SET ?;", req.body)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
}); 

//insert a paid info
router.post("/payments", function(req, res, next) {
  //your code here
  db("INSERT INTO payment SET ?;", req.body)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
}); 

//delete loan and payment data
router.delete("/loans/:id", function(req, res, next) {
  //your code here
  db("DELETE FROM payment WHERE loan_id = ?; DELETE FROM loan WHERE id = ?;", [req.params.id,req.params.id])
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

//update status to complete/done
router.put("/loans/:id/:status", (req, res) => {
  db("UPDATE loan SET status = ? WHERE id = ?;", [req.params.status,req.params.id])
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});


module.exports = router;
