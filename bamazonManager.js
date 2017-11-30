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

function returnMain() {
  inquirer
    .prompt([
      {
        type: "confirm",
        message: "Would you like to return to the main menu?",
        default: "true",
        name: "menu_confirm"
      }
    ]).then(function(inquirerResponse) {
      if (inquirerResponse.menu_confirm) {
        mainMenu();
      } else {
        console.log("Bye bye!");
      };
    });
};

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
            con.query("SELECT * FROM products", function(err, result, fields) {
              if (err) throw err;
              for (var i = 0; i < result.length; i++) {
                console.log(result[i]);
              };
              returnMain();
            });
            break;
          case "View Low Inventory":
            con.query("SELECT * FROM products WHERE stock_quantity <= 100", function(err, result, fields) {
              if (err) throw err;
              if (result.length > 1) {
                for (var i = 0; i < result.length; i++) {
                  console.log(result[i]);
                };
              } else {
                console.log("There are no products with low inventory.");
                returnMain();
              };
            });
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

mainMenu();
