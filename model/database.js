require("dotenv").config();
const mysql = require("mysql");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "borrowlend",
  multipleStatements: true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  let sql =
    " DROP DATABASE IF exists borrowlend ; CREATE DATABASE borrowlend; USE borrowlend; "
    + "CREATE TABLE users (id int NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL, email varchar(255) NOT NULL, password varchar(50) NOT NULL, threshold_limit FLOAT, threshold_period varchar(10),PRIMARY KEY (id)); "
    + "CREATE TABLE contacts (id int NOT NULL AUTO_INCREMENT, user_id int NOT NULL, name varchar(255) NOT NULL, contact_number varchar(20), email varchar(50), relationship varchar(50),PRIMARY KEY (id)); "
    + "CREATE TABLE category (id int NOT NULL AUTO_INCREMENT, category_name varchar(150) NOT NULL,PRIMARY KEY (id)); "
    + "CREATE TABLE loan (id int NOT NULL AUTO_INCREMENT, user_id int NOT NULL, contact_id int NOT NULL, date DATETIME NOT NULL, initial_amount FLOAT NOT NULL, category_id int NOT NULL, remarks TEXT, status varchar(8) NOT NULL DEFAULT 'active', type varchar(8) NOT NULL DEFAULT 'borrow',PRIMARY KEY (id)); "
    + "CREATE TABLE payment (id int NOT NULL AUTO_INCREMENT, loan_id int NOT NULL, amount_paid FLOAT NOT NULL, date DATETIME NOT NULL,PRIMARY KEY (id));"
    + "ALTER TABLE contacts ADD CONSTRAINT contacts_fk0 FOREIGN KEY (user_id) REFERENCES users (id); ALTER TABLE loan ADD CONSTRAINT loan_fk0 FOREIGN KEY (user_id) REFERENCES users (id); ALTER TABLE loan ADD CONSTRAINT loan_fk1 FOREIGN KEY (contact_id) REFERENCES contacts (id); ALTER TABLE loan ADD CONSTRAINT loan_fk2 FOREIGN KEY (category_id) REFERENCES category (id); ALTER TABLE payment ADD CONSTRAINT payment_fk0 FOREIGN KEY (loan_id) REFERENCES loan (id); ";

  let sqlInsert = "INSERT INTO users(email,name,password,threshold_limit, threshold_period) VALUES ('Ms. Lovelyz', 'amazing@somehere.com', 'stillunderdev', 1000.00, 'yearly'); "
    + "INSERT INTO contacts(user_id,name,contact_number) VALUES (1, 'Leena', '123-456-333'), (1, 'Mee Fah', '123-000-333'), (1, 'Zila', '123-222-555'); "
    + "INSERT INTO category(category_name) VALUES ('Medical/Healthcare'), ('School/Education'), ('Finance/Debt Payment'), ('Housing'), ('Food'), ('Transportation'), ('Utilities'), ('Insurance'), ('Personal Spending'), ('Recreation/Entertainment'), ('Miscellaneous');";

  con.query(sql + sqlInsert, function(err, result) {
    if (err) throw err;
    console.log("Tables creation with dummy data for 'borrowlend' db was successful!");

    console.log("Closing...");
  });



  con.end();
});
