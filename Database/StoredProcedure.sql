-- Customer Stored Procedures
USE Kustoma24
GO
CREATE PROCEDURE add_customer 
    @fullname VARCHAR(100),
    @email VARCHAR(100),
    @profile VARCHAR(255),
    @loyalty_points INT,
    @country VARCHAR(100),
    @DOB DATETIME,
    @phonenumber INT,
    @gender VARCHAR(10),
    @password VARCHAR(255),
    @status VARCHAR(255)
AS
BEGIN
  SET NOCOUNT ON;
    INSERT INTO kustoma.customer(fullname,email,profile,password,gender,status,loyalty_points,country,DOB,phonenumber)
    VALUES (@fullname,@email,@profile,@password,@gender,@status,@loyalty_points,@country,@DOB,@phonenumber)
END
GO

CREATE PROCEDURE update_loyalty_points 
    @id INT,
    @points INT
AS
  SET NOCOUNT ON;
    UPDATE kustoma.customer
    SET loyalty_points = loyalty_points + @points
    WHERE id = @id
GO
CREATE PROCEDURE GetCustomers
AS
BEGIN
  SET NOCOUNT ON;
    SELECT *
    FROM kustoma.customer
    WHERE isDeleted = 0;
END
GO
CREATE PROCEDURE Remove_Customer
    @customer_id INT
AS
BEGIN
  SET NOCOUNT ON;
    UPDATE kustoma.customer
    SET isDeleted = 1
    WHERE id = @customer_id
END
GO

CREATE PROCEDURE UpdateCustomer
    @id INT,
    @fullname VARCHAR(100),
    @email VARCHAR(100),
    @phonenumber INT,
    @profile VARCHAR(255),
    @password VARCHAR(255)
AS
BEGIN
  SET NOCOUNT ON;
    UPDATE kustoma.customer
    SET fullname = @fullname,
      email = @email,
      profile = @profile,
      phonenumber = @phonenumber,
      password = @password
  WHERE id = @id;
END
GO
CREATE PROCEDURE UpdateCustomer_Status
    @id INT,
    @status BIT
AS
BEGIN
  SET NOCOUNT ON;
    UPDATE kustoma.customer
    SET status = @status
    WHERE id = @id
END
GO
CREATE PROCEDURE Remove_Customer
    @id INT
AS
BEGIN
  SET NOCOUNT ON;
    UPDATE kustoma.customer
    SET isDeleted = 1
    WHERE id = @id
END
GO
-- Product Stored Procedures
CREATE PROCEDURE getProduct

AS
    SELECT * FROM kustoma.products 
    WHERE isDeleted = 0 AND status = 'active'
GO

CREATE PROCEDURE AddProduct
    @title varchar(100),
    @image varchar(255),
    @category_id INT,
    @description varchar(255),
    @price decimal(10,2),
    @status VARCHAR(100),
    @rate INT,
    @count INT
AS
BEGIN
  SET NOCOUNT ON;
    -- Insert product into Products table
    INSERT INTO kustoma.products (title, image, category_id, description, price, status,rate,[count])
    VALUES (@title, @image, @category_id, @description, @price, @status,@rate,@count)
END
GO

CREATE PROCEDURE Remove_Product
    @id INT
AS
BEGIN
  SET NOCOUNT ON;
    UPDATE kustoma.products
    SET isDeleted = 1
    WHERE id = @id
END
GO

CREATE PROCEDURE UpdateProduct_Status
    @status INT,
    @id INT
AS
BEGIN
  SET NOCOUNT ON; 
    UPDATE kustoma.products
    SET status = @status
    WHERE id = @id
END
GO
CREATE PROCEDURE Update_product
    @id INT,
    @title varchar(100),
    @image varchar(255),
    @category_id INT,
    @description varchar(255),
    @price decimal(10,2)
AS
BEGIN
  SET NOCOUNT ON; 
    UPDATE kustoma.products
    SET title=@title, 
    image=@image, 
    category_id =@category_id, 
    "description" = @description, 
    price = @price
    WHERE id = @id
END
GO
-- Activities Procedures

CREATE PROCEDURE Getactivity
    @id INT
AS
    SELECT * FROM kustoma.activity 
    WHERE user_id = @id;
GO

CREATE PROCEDURE add_activity
    @title VARCHAR(100),
    @description VARCHAR(MAX),
    @user_id INT
AS
BEGIN
  SET NOCOUNT ON;
    INSERT INTO kustoma.activity (user_id,title,"description")
    VALUES (@user_id,@title, @description)
END
GO

CREATE PROCEDURE Getnotifications
    @id INT
AS
    SELECT * FROM kustoma.notification 
    WHERE user_id = @id;
GO
-- Notifications Stored Procedures
CREATE PROCEDURE add_notifications
    @title VARCHAR(100),
    @description VARCHAR(MAX),
    @user_id INT,
    @receiver INT
AS
BEGIN
  SET NOCOUNT ON;
    INSERT INTO kustoma.notification (user_id,title,"description",receiver)
    VALUES (@user_id,@title, @description,@receiver)
END
GO


-- User Stored Procedures

CREATE PROCEDURE UserLogin
    @email VARCHAR(100)
AS
    SELECT * FROM kustoma.users 
    WHERE email = @email
GO

CREATE PROCEDURE GetUser
    @id INT
AS
BEGIN
  SET NOCOUNT ON;
    SELECT *
    FROM kustoma.users
    WHERE id = @id;
END
GO

CREATE PROCEDURE RemoveUser
    @id INT
AS
BEGIN
  SET NOCOUNT ON;
    UPDATE kustoma.users
    SET isDeleted = 1
    WHERE id = @id
END
GO
CREATE PROCEDURE UpdateUserStatus
    @id INT,
    @status VARCHAR(100)
AS
BEGIN
  SET NOCOUNT ON;
    UPDATE kustoma.users
    SET "status" = @status
    WHERE id = @id
END
GO

CREATE PROCEDURE add_User
    @fullname VARCHAR(255),
    @email VARCHAR(255),
    @profile VARCHAR(25),
    @password VARCHAR(255),
    @gender VARCHAR(255),
    @department VARCHAR(255),
    @roles VARCHAR(255),
    @status VARCHAR(255)
AS
BEGIN
  SET NOCOUNT ON;
    INSERT INTO kustoma.users(fullname,email ,"profile" ,"password" ,gender ,department ,roles ,"status")
    VALUES (@fullname,@email,@profile,@password,@gender,@department,@roles,@status)
END
GO

CREATE PROCEDURE UpdateUser
    @id INT,
    @fullname VARCHAR(255),
    @email VARCHAR(255),
    @profile VARCHAR(25),
    @password VARCHAR(255),
    @department VARCHAR(255),
    @roles VARCHAR(255)
AS
BEGIN
  SET NOCOUNT ON;
    UPDATE kustoma.users
    SET fullname = @fullname,
      email = @email,
      profile = @profile,
      password = @password,
      department = @department,
      roles = @roles
  WHERE id = @id;
END
GO
-- Categories Stored Procedure

CREATE PROCEDURE GetCategories
AS
    SELECT * FROM kustoma.category
    WHERE isDeleted = 0 AND status = 1
GO

CREATE PROCEDURE AddCategory
    @name varchar(100),
    @status BIT
AS
BEGIN
  SET NOCOUNT ON;
    -- Insert category into Categories table
    INSERT INTO kustoma.category (name,status) 
    VALUES (@name,@status)
END
GO

CREATE PROCEDURE Remove_Category
    @id INT
AS
BEGIN
  SET NOCOUNT ON; 
    UPDATE kustoma.category
    SET isDeleted = 1
    WHERE id = @id
END
GO

CREATE PROCEDURE Update_Category
    @name VARCHAR(100),
    @id INT
AS
BEGIN
  SET NOCOUNT ON; 
    UPDATE kustoma.category
    SET name = @name
    WHERE id = @id
END
GO
CREATE PROCEDURE UpdateCategory_Status
    @status INT,
    @id INT
AS
BEGIN
  SET NOCOUNT ON; 
    UPDATE kustoma.category
    SET status = @status
    WHERE id = @id
END
GO


-- SALES Stored Procedure
CREATE PROCEDURE AddSale
    @date date,
    @product_id int[],
    @quantities int[],
    @prices decimal(10,2)[],
    @customer_id int,
    @discount decimal(10,2) = 0,
    @payment_method varchar(50)
AS
BEGIN
  SET NOCOUNT ON;
    DECLARE @i int = 1
    DECLARE @total_price decimal(10,2) = 0
    
    WHILE @i <= (SELECT COUNT(*) FROM @product_id)
    BEGIN
      SET NOCOUNT ON;
        DECLARE @product_id int = @product_id[@i]
        DECLARE @quantity int = @quantities[@i]
        DECLARE @price decimal(10,2) = @prices[@i]
        DECLARE @subtotal decimal(10,2) = @price * @quantity
        SET @total_price += @subtotal
        
        INSERT INTO kustoma.sales (date, product_id, customer_id, price, discount, quantity, total_price, payment_method)
        VALUES (@date, @product_id, @customer_id, @price, @discount, @quantity, @subtotal, @payment_method)
        
        SET @i += 1
    END
    
    UPDATE kustoma.sales SET total_price = @total_price WHERE customer_id = @customer_id AND date = @date
END
GO
CREATE PROCEDURE get_weekly_sales
AS
BEGIN
  SET NOCOUNT ON;
  SELECT DATENAME(WEEKDAY, date) AS day, SUM(total_price) AS total, 
         SUM(CASE WHEN status = 'complete' THEN total_price ELSE 0 END) AS complete,
         SUM(CASE WHEN status = 'refunded' THEN total_price ELSE 0 END) AS refunded,
         SUM(CASE WHEN status = 'pending' THEN total_price ELSE 0 END) AS pending
  FROM kustoma.sales
  WHERE date >= DATEADD(day, -7, GETDATE())
  GROUP BY DATENAME(WEEKDAY, date)
END
GO

CREATE PROCEDURE uspGetSalesStats
AS
BEGIN
  SET NOCOUNT ON;
    SET NOCOUNT ON;

    SELECT 
        SUM(price * quantity) AS revenue,
        SUM(price * quantity * (100 - discount) / 100) AS total_cost,
        SUM(price * quantity * discount / 100) AS discount_amount,
        SUM(price * quantity * (100 - discount) / 100) - SUM(price * quantity) AS profit_loss
    FROM kustoma.sales
    WHERE status = 'complete';

END
