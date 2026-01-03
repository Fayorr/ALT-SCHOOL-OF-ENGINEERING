CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description VARCHAR(255)
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role ENUM('admin', 'user') NOT NULL,
    password VARCHAR(255) NOT NULL,
    contact VARCHAR(255),
    gender ENUM('male', 'female'),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    size ENUM('small', 'medium', 'large') NOT NULL,
    stock_quantity INT NOT NULL,
    category_id INT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);


CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    admin_verdict ENUM('pending', 'approved', 'declined') DEFAULT 'pending',
    admin_id INT DEFAULT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (admin_id) REFERENCES users(id)
);

CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    item_id INT NOT NULL,
    price_at_order_time DECIMAL(10,2) NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (item_id) REFERENCES items(id)
);


-- inserting (Show commands for inserting records into two or more entities)
INSERT INTO users
(id, name, email, role, password, contact, gender)
values (1, 'Fayokunmi', 'fayokunmiosho@gmail.com', 
'admin', 'FayokunmiOsho', '+2348090928406', 'male'),(2, 'Osho', 'osho@gmail.com', 
'user', 'OshoOsho1', '+2349050184494', 'male');

INSERT INTO categories (name, description)
VALUES
('toothpaste', 'for fresh breath'),
('soap', 'for clean clothes');


INSERT INTO items (name, price, size, stock_quantity, category_id)
VALUES
('Maclean', 120.00, 'large', 200, 1),
('Siri Soap', 50.00, 'small', 100, 2);

INSERT INTO orders (user_id, total_price)
VALUES
(2, 600.00),
(2, 250.00);

INSERT INTO orders
(id, user_id, total_price, admin_verdict, admin_id)
values (3, 2, 250.00, 'approved', NULL);

INSERT INTO order_items (order_id, item_id, price_at_order_time, quantity)
VALUES
(1, 1, 120.00, 5),
(2, 2, 50.00, 5);

-- selecting (Show commands for getting records from two or more entities)
SELECT users.name, orders.total_price, orders.admin_verdict
FROM orders
JOIN users ON orders.user_id = users.id;

SELECT order_items.quantity, orders.total_price, orders.admin_verdict
FROM orders
JOIN order_items ON orders.id = order_items.order_id;

-- updating (Show commands for updating records from two or more entities)
UPDATE orders
SET admin_verdict = 'approved',
    admin_id = 1
WHERE id = 2;

UPDATE items
JOIN order_items ON items.id = order_items.item_id
SET items.stock_quantity = items.stock_quantity - order_items.quantity
WHERE order_items.order_id = 2;


-- deleting (Show commands for deleting records from two or more entities)
DELETE FROM items 
WHERE category_id = (SELECT id FROM categories WHERE name = 'toothpaste');

DELETE FROM items 
WHERE category_id = (SELECT id FROM categories WHERE name = 'toothpaste');

DELETE FROM orders 
WHERE user_id IN (
    SELECT id FROM users WHERE role = 'user'
);

-- Show commands for query records from multiple entities using joins
SELECT users.name AS user_name, items.name AS item_name, order_items.quantity
FROM users
JOIN orders ON users.id = orders.user_id
JOIN order_items ON orders.id = order_items.order_id
JOIN items ON order_items.item_id = items.id;

SELECT categories.name AS category_name, items.name AS item_name, items.price
FROM categories
JOIN items ON categories.id = items.category_id;