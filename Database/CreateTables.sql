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
    phonenumber VARCHAR(255),  -- Changed data type to BIGINT
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


SELECT * FROM kustoma.products

SELECT * FROM kustoma.users






