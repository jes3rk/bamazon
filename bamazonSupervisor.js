// Dependencies
var inquirer = require("inquirer");
var mysql = require("mysql");
var password = require("./password.js");
require("console.table");

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
          con.query("SELECT departments.*,  products.product_sales, SUM(product_sales) - departments.over_head_costs AS total_profits FROM departments INNER JOIN products ON products.department_name = departments.department_name GROUP BY department_id;", function(err, result, fields) {
            // console.log(result);
            if (err) throw err;
            console.table("Department Sales", result);
            returnMain();
          });
          break;
        case "Create New Department":
          inquirer
            .prompt([
              {
                type: "input",
                message: "What should the new department be called?",
                name: "dept_name"
              },
              {
                type: "input",
                message: "What are the initial overhead costs of the department?",
                name: "dept_over"
              },
              {
                type: "confirm",
                message: "Would you like to add any products to the new department?",
                name: "dept_new"
              }
            ]).then(function(inquirerResponse) {
              var raw_name = inquirerResponse.dept_name;
              var name = '"' + raw_name + '"';
              var over = parseInt(inquirerResponse.dept_over);

              con.query("INSERT INTO departments (department_name, over_head_costs) VALUE (" + name + ", " + over + ");", function(err, result, fields) {
                if (err) throw err;
              });

              if (inquirerResponse.dept_new) {
                inquirer
                  .prompt([
                    {
                      type: "input",
                      message: "What is the name of the item you would like to add to the " + raw_name + " department?",
                      name: "new_name"
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
                    var new_price = parseFloat(inquirerResponse.new_price);

                    inquirer
                      .prompt([
                        {
                          type: "confirm",
                          message: "Add " + inquirerResponse.new_quantity + " units of " + inquirerResponse.new_name + " for the " + raw_name + " department to sell at $" + inquirerResponse.new_price + " per unit?",
                          default: "true",
                          name: "new_confirm"
                        }
                      ]).then(function(inquirerResponse) {
                        if (inquirerResponse.new_confirm) {
                          var sql = "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUE (" + new_name + ", " + name + ", " + new_price + ", " + new_quantity + ");";
                          // console.log(sql);
                          con.query(sql, function(err, result, fields) {
                            console.log("New product added!");
                            returnMain();
                          });
                        };
                      });
                  });
              } else {
                console.log("Department has been created.");
              };
            });
          break;
        default:
            console.log("Sorry, I didn't catch that.");
      };
    });
};

mainMenu();
