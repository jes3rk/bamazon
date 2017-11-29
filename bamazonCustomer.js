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

// Actually does the shopping
function shopper(id, quan) {
  // Ping the database for the product
  con.query("SELECT * FROM products WHERE item_id = " + id, function (err, result, fields) {
    if (err) throw err;
    // console.log(result[0].price);
    if (result[0].stock_quantity >= quan) {
      var total = quan * result[0].price;
      var newQuan = result[0].stock_quantity - quan;
      // Prompt to confirm
      inquirer
        .prompt([
          {
            type: "confirm",
            message: "You would like to purchase " + quan + " units of " + result[0].product_name + " at $" + result[0].price + " for a total of $" + total + "?",
            default: "true",
            name: "purchase_confirm"
          }
        ]).then(function(inquirerResponse) {
          if (inquirerResponse.purchase_confirm) {
            con.query("UPDATE products SET stock_quantity = " + newQuan + " WHERE item_id = " + id, function(err, result, fields) {
              console.log("Thank you for your purchase")
            });
          } else {
           console.log("I'm sorry this wasn't what you were looking for.");
          };
        });
    } else {
      console.log("I'm sorry, we don't have enough product in stock to complete your order.");
    };
  });
};

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

    switch (initial) {
      case "I would like to shop for a product!":
        con.query("SELECT product_name, price FROM products", function(err, result, fields) {
          if (err) throw err;
          // console.log(result[2]);
          var choiceArr = [];
          for (var i = 0; i < result.length; i++) {
            choiceArr.push(result[i].product_name + ", $" + result[i].price);
          };
          inquirer
            .prompt([
              {
                type: "list",
                message: "Which product would you like to purchase?",
                choices: choiceArr,
                name: "productChoice"
              },
              {
                type: "input",
                message: "And what quantity?",
                name: "quantity_2"
              }
            ]).then(function(inquirerResponse) {
              var choice = inquirerResponse.productChoice;

              for (var i = 0; i < choiceArr.length; i++) {
                if (choiceArr[i] === choice) {
                  shopper(i + 1, inquirerResponse.quantity_2);
                };
              };
            });
        });

        break;
      case "I know what I want to buy, just let me buy.":
      // User input prompt
        inquirer
          .prompt([
            {
              type: "input",
              message: "Please enter the product ID of the product you would like to purchase.",
              name: "userInput"
            },
            {
              type: "input",
              message: "And what quantity?",
              name: "quantity"
            }
          ])
          .then(function(inquirerResponse) {
            var id = inquirerResponse.userInput;
            var quantity = parseInt(inquirerResponse.quantity);

            shopper(id, quantity);
          });
        break;
      default:
        console.log("I'm sorry, I didn't quite get that...");

    };
  });
