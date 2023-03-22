CREATE PROCEDURE add_customer 
    @fullname VARCHAR(100),
    @email VARCHAR(100),
    @profile VARCHAR(255),
    @gender VARCHAR(10),
    @password VARCHAR(255),
    @status VARCHAR(255)
AS
    INSERT INTO kustoma.customer(fullname,email,profile,password,gender,status)
    VALUES (@fullname,@email,@profile,@password,@gender,@status)
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

CREATE PROCEDURE add_category
    @category_name VARCHAR(50)
AS
    INSERT INTO kustoma.category("name")
    VALUES (@category_name)
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
    INSERT INTO kustoma.users
    VALUES (@fullname,@email,@profile,@password,@gender,@department,@roles,@status)
END
GO

