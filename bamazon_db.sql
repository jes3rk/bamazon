DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
	item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(40) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price FLOAT(10) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
	VALUE 
		("Floomba", "Electronics", 399.99, 10000),
        ("Generic Broom", "Witch Arts & Crafts", 24.99, 1200),
        ("My First Car", "Children", 19.99, 12000),
        ("Generic Brand Beer", "Home Essentials", 12.99, 8500),
        ("Rope... The Best Rope", "Outdoors", 59.99, 1250),
        ("HiPod", "Electonics", 299.99, 5560),
        ("My Little Cauldron", "Witch Arts and Crafts", 15.99, 2200),
        ("Everything but the Kitchen Sink", "Home Essentials", 155.99, 3640),
        ("Literally a Leaf", "Outdoors", .99, 22000),
        ("Action Barbie Joe", "Children", 39.99, 1200);


SELECT * FROM products;