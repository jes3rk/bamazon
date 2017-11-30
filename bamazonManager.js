// Dependencies
var inquirer = require("inquirer");
var mysql = require("mysql");
var password = require("./password.js");

// Make the connection
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: password,
  database: "bamazon_db"
});

// Connection test
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// Main menu inquirer
function mainMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Welcome, manager. What would you like to do today?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
        name: "manage_choice"
      }
    ]).then(function(inquirerResponse) {
        switch (inquirerResponse.manage_choice) {
          case "View Products for Sale":

            break;
          case "View Low Inventory":

            break;
          case "Add to Inventory":

            break;
          case "Add New Product":

            break;
          default:
            console.log("Sorry, I didn't catch that.");
        };
    });
};
