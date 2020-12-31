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

router.get("/contacts", (req, res) => {
  // Send back the full list of items
  db("SELECT id, name FROM contacts ORDER BY name ASC;")
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
router.get("/loans/summary/:id/:type", (req, res) => {
  // Send back the full list of items
  db("SELECT l.id, l.date, l.remarks, c.name, c.contact_number, l.initial_amount, l.status, "
   + "SUM(IFNULL(p.amount_paid,0)) AS totalpaid, "
   + "l.initial_amount - SUM(IFNULL(p.amount_paid, 0)) AS currentamount "
   + "FROM loan l LEFT JOIN payment p ON l.id = p.loan_id "
   + "INNER JOIN contacts c ON l.contact_id = c.id WHERE l.user_id = ? AND l.type = ?"
   + "GROUP BY l.id, l.date, l.remarks, c.name, c.contact_number, l.initial_amount, l.status;", 
   [req.params.id,req.params.type])
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
