DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
	item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(40) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price FLOAT(10) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL,
	product_sales FLOAT(10) DEFAULT 0,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
	VALUE 
		("Floomba", "Electronics", 399.99, 10000),
        ("Generic Broom", "Witch Arts & Crafts", 24.99, 1200),
        ("My First Car", "Children", 19.99, 12000),
        ("Generic Brand Beer", "Home Essentials", 12.99, 8500),
        ("Rope... The Best Rope", "Outdoors", 59.99, 1250),
        ("HiPod", "Electronics", 299.99, 5560),
        ("My Little Cauldron", "Witch Arts & Crafts", 15.99, 2200),
        ("Everything but the Kitchen Sink", "Home Essentials", 155.99, 3640),
        ("Literally a Leaf", "Outdoors", .99, 22000),
        ("Action Barbie Joe", "Children", 39.99, 1200);

CREATE TABLE departments(
	department_id INTEGER(10) AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    over_head_costs FLOAT(10) NOT NULL,
    total_profit FLOAT(10),
    PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
	VALUE
		("Electronics", 10000),
        ("Witch Arts & Crafts", 8000),
        ("Children", 9500),
        ("Home Essentials", 12500),
        ("Outdoors", 5640);
        



SELECT departments.*,  products.product_sales FROM departments
	INNER JOIN products ON products.department_name = departments.department_name
    GROUP BY department_id;

