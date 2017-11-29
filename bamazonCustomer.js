// Dependencies
var inquirer = require("inquirer");
var mysql = require("mysql");
var password = require("./password.js");

// Make the connection
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: password
});

// Connection test
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
