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

// Greeting
console.log("Welcome to bamazon: your one stop shop for anything and everything!");

// First Prompt
inquirer
  .prompt([
    {
      type: "list",
      message: "What can I do for you today?",
      choices: ["I would like to shop for a product!", "I know what I want to buy, just let me buy."],
      name: "initialPrompt"
    }
  ])
  .then(function(inquirerResponse) {

    var initial = inquirerResponse.initialPrompt;

    switch (intial) {
      case "I would like to shop for a product!":

        break;
      case "I know what I want to buy, just let me buy.":
      // User input prompt
        inquirer
          .prompt([
            {
              type: "input",
              message: "Please enter the product ID of the product you would like to purchase.",
              name: "userInput"
            }
          ])
          .then(function(inquirerResponse) {
            var id = inquirerResponse.userInput;

            // Ping the database for the product
            con.connect(function(err) {
              if (err) throw err;
              con.query("SELECT * FROM customers WHERE item_id = " + id, function (err, result, fields) {
                if (err) throw err;
                console.log(result);
              });
            });
          });
        break;
      default:
        console.log("I'm sorry, I didn't quite get that...");

    };
  });
