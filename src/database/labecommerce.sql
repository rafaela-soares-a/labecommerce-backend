-- Active: 1675696960953@@127.0.0.1@1433

CREATE TABLE
    users (
        id INTEGER PRIMARY KEY UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    );

INSERT INTO
    users (id, email, password)
VALUES (
        "03",
        "joao@email.com",
        "joao1234"
    ), (
        "04",
        "devinho@email.com",
        "devinho123"
    ), (
        "05",
        "marcela@email.com",
        "marcela123"
    );

CREATE TABLE
    products (
        id INTEGER PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        category TEXT NOT NULL
    );

INSERT INTO
    products (id, name, price, category)
VALUES (
        "03",
        "Microwaves",
        "400",
        "DOMESTIC_APPLIANCES"
    ), (
        "04",
        "Fridge",
        "1.000",
        "DOMESTIC_APPLIANCES"
    ), (
        "05",
        "Television",
        "1700",
        "ELECTRONICS"
    ), (
        "06",
        "Fan",
        "230",
        "ELECTRONICS"
    ), (
        "07",
        "Humidifier",
        "580",
        "ELECTRONICS"
    );

-- retorna todos os usuários e produtos:

SELECT * FROM users;

SELECT * FROM products ;

-- Search Product by name

SELECT * FROM products WHERE name = "Fan";

-- create user

INSERT INTO
    users (id, email, password)
VALUES (
        "06",
        "usuario06@email.com",
        "usuario06"
    );

INSERT INTO
    products (id, name, price, category)
VALUES (
        "08",
        "APPLE TV",
        "6500",
        "ELECTRONICS"
    );

-- Get Products by id and user

SELECT * FROM products WHERE id = "04";

SELECT * FROM users WHERE id = "05";

-- delete product by id and user

DELETE FROM products WHERE id = "08";

DELETE FROM users WHERE id = "06";

-- edit user and product by Id

UPDATE users
SET
    email = "bananinha@email.com.br",
    password = "bananinha123"
WHERE id = 03;

UPDATE products
SET
    name = "Laptop",
    price = "800"
WHERE id = 05;

SELECT * FROM users
ORDER BY email ASC;

SELECT * FROM products
WHERE price >20
ORDER BY price ASC;

SELECT * FROM products
WHERE price >800.0 OR price <300.0
ORDER BY price ASC;