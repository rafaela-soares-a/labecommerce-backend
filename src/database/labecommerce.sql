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

CREATE TABLE table_purchase (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER NOT NULL,
    delivered_at TEXT,
    buyer_id TEXT NOT NULL,
    Foreign Key (buyer_id) REFERENCES users(id)
);

SELECT * FROM table_purchase;

SELECT * FROM users;

SELECT * FROM products;

INSERT INTO table_purchase (id, total_price, paid, buyer_id)
VALUES ("p001",300, 30, "03" );

INSERT INTO table_purchase (id, total_price, paid, buyer_id)
VALUES ("p002", 200, 0, "05"),
("p003", 100, 1, "04"),
("p004", 50, 1, "04"),
("p005", 80, 0, "05"),
("p006", 700, 1, "06");

UPDATE table_purchase
 SET delivered_at = datetime ('now', 'localtime')
WHERE id = 05;

-- junção das tabelas A e B (tabela A: table_purchase) (tabela B: users) on chave estrageira = chave primaria:
SELECT * FROM table_purchase
INNER JOIN users
ON table_purchase.buyer_id = users.id;
