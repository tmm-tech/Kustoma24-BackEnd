CREATE DATABASE Kustoma24;


CREATE TABLE kustoma.users (
    id INT  IDENTITY(1,1) PRIMARY KEY,
    fullname VARCHAR(250) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    "profile" VARCHAR(100) NOT NULL,
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
    "profile" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
     gender VARCHAR(100) NOT NULL,
    loyalty_points INT DEFAULT 0,
    isDeleted BIT DEFAULT 0,
    "status" VARCHAR(255) NOT NULL,
    registered_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE kustoma.products(
    id INT  IDENTITY(1,1) PRIMARY KEY,
    title VARCHAR(250) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    "description" TEXT,
    category_id INT NOT NULL,
    "image"  VARCHAR(255),
    rate FLOAT,
    count INT NOT NULL,
    isDeleted BIT DEFAULT 0,
    "status" BIT DEFAULT 1,
    date DATE NOT NULL,
    FOREIGN KEY (category_id) REFERENCES kustoma.category(id)
);

CREATE TABLE kustoma.category(
    id INT  IDENTITY(1,1) PRIMARY KEY,
    "name" VARCHAR(250) NOT NULL,
    "status" BIT DEFAULT 0,
     "date" DATETIME DEFAULT CURRENT_TIMESTAMP,
     isDeleted BIT DEFAULT 0
);

CREATE TABLE kustoma.activity(
    id INT  IDENTITY(1,1) PRIMARY KEY,
    month VARCHAR(250) NOT NULL,
    user_id INT NOT NULL,
    day INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    "description" VARCHAR(100) NOT NULL,
    registered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES kustoma.users(id)
);


CREATE TABLE kustoma.sales(
    id INT IDENTITY(1,1) PRIMARY KEY,
    date DATE NOT NULL,
    product_id INT NOT NULL,
    customer_id INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    discount DECIMAL(10,2) DEFAULT 0,
    quantity INT NOT NULL,
    total_price DECIMAL(10,2) NOT  NULL,
    payment_method VARCHAR(50) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    FOREIGN KEY (customer_id) REFERENCES kustoma.customer(id),
    FOREIGN KEY (product_id) REFERENCES kustoma.products(id)
);