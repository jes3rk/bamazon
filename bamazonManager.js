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
            con.query("SELECT * FROM products;", function(err, result, fields) {
              if (err) throw err;
              for (var i = 0; i < result.length; i++) {
                console.log(result[i]);
              };
              returnMain();
            });
            break;
          case "View Low Inventory":
            con.query("SELECT * FROM products WHERE stock_quantity <= 100;", function(err, result, fields) {
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
            inquirer
              .prompt([
                {
                  type: "list",
                  message: "Select itme to re-stock:",
                  choices: ["by product name", "by item id"],
                  name: "add_choice"
                }
              ]).then(function(inquirerResponse) {
                switch (inquirerResponse.add_choice) {
                  case "by product name":
                    con.query("SELECT product_name FROM products", function(err, result, fields) {
                      if (err) throw err;
                      var choices = [];
                      for (var i = 0; i < result.length; i++) {
                        choices.push(result[i].product_name);
                      };
                      inquirer
                        .prompt([
                          {
                            type: "list",
                            message: "Please select a product",
                            choices: choices,
                            name: "choice"
                          },
                          {
                            type: "input",
                            message: "How many units would you like to add?",
                            name: "additional"
                          }
                        ]).then(function(inquirerResponse) {
                          for (var i = 0; i < choices.length; i++) {
                            if (choices[i] === inquirerResponse.choice) {
                              var id = i + 1;
                              con.query("UPDATE products SET stock_quantity = stock_quantity + " + parseInt(inquirerResponse.additional) + " WHERE item_id = " + id + ";", function(err, result, fields) {
                                console.log("Successfully added product");
                                returnMain();
                              });
                            };
                          };
                        });
                    });
                    break;
                  case "by item id":
                    inquirer
                      .prompt([
                        {
                          type: "input",
                          message: "Please type the item id of the item you wish to re-stock",
                          name: "id"
                        },
                        {
                          type: "input",
                          message: "How many units would you like to add?",
                          name: "additional"
                        }
                      ]).then(function(inquirerResponse) {
                        con.query("UPDATE products SET stock_quantity = stock_quantity + " + parseInt(inquirerResponse.additional) + " WHERE item_id = " + parseInt(inquirerResponse.id) + ";", function(err, result, fields) {
                          console.log("Successfully added product");
                          returnMain();
                        });
                      });
                    break;
                };
              });
            break;
          case "Add New Product":
            inquirer
              .prompt([
                {
                  type: "input",
                  message: "What is the name of the item you would like to add?",
                  name: "new_name"
                },
                {
                  type: "input",
                  message: "What department does this item fall into?",
                  name: "new_dept"
                },
                {
                  type: "input",
                  message: "How many units of this product should we intially stock?",
                  name: "new_quantity"
                },
                {
                  type: "input",
                  message: "How much should we sell this product for?",
                  name: "new_price"
                }
              ]).then(function(inquirerResponse) {
                var new_name = '"' + inquirerResponse.new_name + '"';
                var new_quantity = parseInt(inquirerResponse.new_quantity);
                var new_dept = '"' + inquirerResponse.new_dept + '"';
                var new_price = parseFloat(inquirerResponse.new_price);

                inquirer
                  .prompt([
                    {
                      type: "confirm",
                      message: "Add " + inquirerResponse.new_quantity + " units of " + inquirerResponse.new_name + " for the " + inquirerResponse.new_dept + " department to sell at $" + inquirerResponse.new_price + " per unit?",
                      default: "true",
                      name: "new_confirm"
                    }
                  ]).then(function(inquirerResponse) {
                    console.log(new_name);
                    if (inquirerResponse.new_confirm) {
                      var sql = "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUE (" + new_name + ", " + new_dept + ", " + new_price + ", " + new_quantity + ");";
                      // console.log(sql);
                      con.query(sql, function(err, result, fields) {
                        console.log("New product added!");
                        returnMain();
                      });
                    };
                  });
              });
            break;
          default:
            console.log("Sorry, I didn't catch that.");
        };
    });
};

mainMenu();
