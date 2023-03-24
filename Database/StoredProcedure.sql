use Kustoma24
CREATE PROCEDURE add_customer 
    @fullname VARCHAR(100),
    @email VARCHAR(100),
    @profile VARCHAR(255),
    @gender VARCHAR(10),
    @password VARCHAR(255),
    @status VARCHAR(255)
AS
BEGIN
    INSERT INTO kustoma.customer(fullname,email,profile,password,gender,status)
    VALUES (@fullname,@email,@profile,@password,@gender,@status)
END
GO


CREATE PROCEDURE update_loyalty_points 
    @id INT,
    @points INT
AS
    UPDATE kustoma.customer
    SET loyalty_points = loyalty_points + @points
    WHERE id = @id
GO
CREATE PROCEDURE get_products_by_category 
    @category_id INT
AS
    SELECT * FROM kustoma.products
    WHERE category_id = @category_id AND isDeleted = 0

GO

CREATE PROCEDURE add_activity
    @month VARCHAR(100),
    @day INT,
    @title VARCHAR(100),
    @description TEXT
AS
    INSERT INTO kustoma.activity (month,day,title,description)
    VALUES (@month, @day, @title, @description)
GO



CREATE PROCEDURE UserLogin
    @email VARCHAR(50),
    @password VARCHAR(50)
AS
    SELECT * FROM kustoma.users 
    WHERE email = @email AND password = @password
GO

CREATE PROCEDURE GetCustomers
AS
BEGIN
    SELECT *
    FROM kustoma.customer
    WHERE isDeleted = 0;
END
GO
CREATE PROCEDURE getProduct

AS
    SELECT * FROM kustoma.products 
    WHERE isDeleted = 0 AND status = 'active'
GO

CREATE PROCEDURE GetCategories
AS
    SELECT * FROM kustoma.category
    WHERE isDeleted = 0 AND status = 'active'
GO

CREATE PROCEDURE Remove_Category
    @category_id INT
AS
BEGIN 
    UPDATE kustoma.category
    SET isDeleted = 1
    WHERE id = @category_id
END
GO

CREATE PROCEDURE Remove_Product
    @product_id INT
AS
BEGIN
    UPDATE kustoma.products
    SET isDeleted = 1
    WHERE id = @product_id
END
GO

CREATE PROCEDURE Remove_Customer
    @customer_id INT
AS
BEGIN
    UPDATE kustoma.customer
    SET isDeleted = 1
    WHERE id = @customer_id
END
GO

CREATE PROCEDURE Remove_User
    @user_id INT
AS
BEGIN
    UPDATE kustoma.users
    SET isDeleted = 1
    WHERE id = @user_id
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
    INSERT INTO kustoma.users(fullname,email ,"profile" ,"password" ,gender ,department ,roles ,"status")
    VALUES (@fullname,@email,@profile,@password,@gender,@department,@roles,@status)
END
GO

-- CREATE PROCEDURE AddSale
--     @date date,
--     @product_ids int[],
--     @quantities int[],
--     @prices decimal(10,2)[],
--     @customer_id int,
--     @discount decimal(10,2) = 0,
--     @payment_method varchar(50)
-- AS
-- BEGIN
--     DECLARE @i int = 1
--     DECLARE @total_price decimal(10,2) = 0
    
--     WHILE @i <= ARRAY_LENGTH(@product_ids, 1)
--     BEGIN
--         DECLARE @product_id int = @product_ids[@i]
--         DECLARE @quantity int = @quantities[@i]
--         DECLARE @price decimal(10,2) = @prices[@i]
--         DECLARE @subtotal decimal(10,2) = @price * @quantity
--         SET @total_price += @subtotal
        
--         INSERT INTO kustoma.sales (date, product_id, customer_id, price, discount, quantity, total_price, payment_method)
--         VALUES (@date, @product_id, @customer_id, @price, @discount, @quantity, @subtotal, @payment_method)
        
--         SET @i += 1
--     END
    
--     UPDATE kustoma.sales SET total_price = @total_price WHERE customer_id = @customer_id AND date = @date
-- END
-- GO

CREATE PROCEDURE AddProduct
    @name varchar(100),
    @image varchar(255),
    @category varchar(100),
    @description varchar(255),
    @price decimal(10,2),
    @user_id int
AS
BEGIN
    DECLARE @category_id int
    DECLARE @role VARCHAR(255)
    -- Check if category exists
    SELECT @category_id = id FROM kustoma.category WHERE name = @category
    SELECT role = @role FROM kustoma.users WHERE id = @user_id
    -- Set product status based on user role
    DECLARE @status varchar(10)
    SELECT @status = 
        CASE 
            WHEN @role = 'staff' THEN 'inactive'
            ELSE 'active'
        END
    FROM kustoma.users 
    WHERE id = @user_id
    
    -- Insert product into Products table
    INSERT INTO kustoma.products (title, image, category_id, description, price, status)
    VALUES (@name, @image, @category_id, @description, @price, @status)
END
GO

CREATE PROCEDURE AddCategory
    @name varchar(100),
    @date date
AS
BEGIN
    -- Insert category into Categories table
    INSERT INTO kustoma.category (name, date) 
    VALUES (@name, @date)
END
GO