# bamazon

bamazon is a useful online shopping CLI application. The three interations: bamazonCustomer.js, bamazonManager.js, and bamazonSupervisor.js each provide the user with a different interactive experience depending on their seniority level.

## Dependencies
bamazon requires the following npm:
- [inquirer](https://www.npmjs.com/package/inquirer)
- [mysql](https://www.npmjs.com/package/mysql)
- [console.table](https://www.npmjs.com/package/console.table)

All of which are documented in the package.json and as such, can be installed locally using ```npm install ```.

Additionally, the application uses a MySQL server and the scheme for the server as well as the data can be found in ```bamazon_db.sql```.

## bamazonCustomer.js
bamazonCustomer.js is the customer facing interface for the online marketplace. Initially, the user is presented with a simple GUI:
![Customer GUI](./images/customer_1.png)

The second option allows the user to enter an item's unique ```item_id``` as well as a quantity to purchase. Upon entering both those values, the application returns a total and confirmation 
