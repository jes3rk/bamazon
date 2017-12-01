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
              var name = '"' + inquirerResponse.dept_name + '"';
              var over = parseInt(inquirerResponse.dept_over);

              con.query("INSERT INTO departments VALUE (" + name + ", " + over + ");", function(err, result, fields) {
                if (err) throw err;
              })
            })
          break;
        default:
            console.log("Sorry, I didn't catch that.");
      };
    });
};

mainMenu();
