// Dependencies
var inquirer = require("inquirer");
var mysql = require("mysql");
var password = require("./password.js");

// Make the connection
var con = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: password,
  database: "bamazon_db"
});

// Connection test
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

function mainMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Welcome, Supervisor. What would you like to do today?",
        choices: ["View Department Sales", "Create New Department"],
        name: "firstChoice"
      }
    ]).then(function(inquirerResponse) {
      switch (inquirerResponse.firstChoice) {
        case "View Department Sales":

          break;
        case "Create New Department":

          break;
        default:
            console.log("Sorry, I didn't catch that.");
      };
    });
};

mainMenu();
