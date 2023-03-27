CREATE DATABASE Kustoma24;
USE Kustoma24
CREATE SCHEMA kustoma
GO

CREATE TABLE kustoma.users (
    id INT  IDENTITY(1,1) PRIMARY KEY,
    fullname VARCHAR(250) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    "profile" VARCHAR(MAX) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    department VARCHAR(100) NOT NULL,
    roles VARCHAR(20) NOT NULL,
    isDeleted BIT DEFAULT 0,
    "status" VARCHAR(255) NOT NULL,
    registered_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE kustoma.customer(
    id INT  IDENTITY(1,1) PRIMARY KEY,
    fullname VARCHAR(250) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    "profile" VARCHAR(MAX) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    gender VARCHAR(100) NOT NULL,
    loyalty_points INT,
    phonenumber BIGINT,  -- Changed data type to BIGINT
    country VARCHAR(100),
    DOB date,
    isDeleted BIT DEFAULT 0,
    "status" VARCHAR(255) NOT NULL,
    registered_at DATETIME DEFAULT CURRENT_TIMESTAMP
);



DROP TABLE kustoma.category
CREATE TABLE kustoma.category(
    id INT  IDENTITY(1,1) PRIMARY KEY,
    "name" VARCHAR(250) NOT NULL,
    "status" BIT DEFAULT 0,
     "date" DATETIME DEFAULT CURRENT_TIMESTAMP,
     isDeleted BIT DEFAULT 0
);

CREATE TABLE kustoma.products(
    id INT  IDENTITY(1,1) PRIMARY KEY,
    title VARCHAR(250) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    "description" TEXT,
    category_id INT NOT NULL,
    "image"  VARCHAR(MAX),
    rate FLOAT,
    count INT NOT NULL,
    isDeleted BIT DEFAULT 0,
    "status" VARCHAR(225) NOT NULL,
    "date" DATETIME DEFAULT CURRENT_TIMESTAMP
    FOREIGN KEY (category_id) REFERENCES kustoma.category(id)
);



CREATE TABLE kustoma.activity(
    id INT  IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    "description" VARCHAR(MAX),
    "date" DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES kustoma.users(id)
);


CREATE TABLE kustoma.sales(
    id INT IDENTITY(1,1) PRIMARY KEY,
    product_id INT NOT NULL,
    customer_id INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    discount DECIMAL(10,2) DEFAULT 0,
    quantity INT NOT NULL,
    total_price DECIMAL(10,2) NOT  NULL,
    payment_method VARCHAR(50) NOT NULL,
    "status" VARCHAR(20) NOT NULL,
     "date" DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES kustoma.customer(id),
    FOREIGN KEY (product_id) REFERENCES kustoma.products(id)
);



CREATE TABLE kustoma.notification(
    id INT  IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    receiver INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    "description" VARCHAR(100) NOT NULL,
    "date" DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES kustoma.users(id),
    FOREIGN KEY (receiver) REFERENCES kustoma.users(id)
);

SELECT * FROM kustoma.customer

-- INSERT INTO kustoma.products(title,price,description,category_id,image,rate,count,[status],date) VALUES ('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',109.95,'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',3,'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',3.9,120,'active','2023-03-26 23:31:33.847');
-- INSERT INTO kustoma.products(title,price,description,category_id,image,rate,count,[status],[date]) VALUES ('Mens Casual Premium Slim Fit T-Shirts',22.3,'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.',3,'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',4.1,259,'active','2023-03-26 23:31:33.847');
-- INSERT INTO kustoma.products(title,price,description,category_id,image,rate,count,[status],[date]) VALUES ('Mens Cotton Jacket',55.99,'great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.',3,'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',4.7,500,'active','2023-03-26 23:31:33.847');
INSERT INTO kustoma.sales (date, product_id, customer_id, price, discount, quantity, total_price, payment_method, status) VALUES 
('2023-03-17 09:30:00', 1, 1, 109.95, 0.1, 2, 197.91, 'credit card', 'complete'),
('2023-03-10 14:25:00', 3, 3, 55.99, 0.05, 3, 159.56, 'credit card', 'pending'),
('2023-03-10 16:45:00', 2, 1, 55.99, 0.05, 3, 159.56, 'credit card', 'pending'),
('2023-03-09 08:12:00', 1, 3, 7.99, 0.15, 4, 27.16, 'paypal', 'complete'),
('2023-02-22 21:05:00', 2, 2, 64.9, 0.3, 1, 45.43, 'credit card', 'refunded'),
('2023-02-15 11:53:00', 3, 2, 109.95, 0.2, 2, 175.92, 'credit card', 'complete'),
('2023-02-10 16:20:00', 2, 1, 22.3, 0.1, 3, 60.21, 'paypal', 'refunded'),
('2023-02-08 13:48:00', 1, 3, 55.99, 0.25, 1, 41.99, 'debit card', 'pending');


SELECT * FROM kustoma.products