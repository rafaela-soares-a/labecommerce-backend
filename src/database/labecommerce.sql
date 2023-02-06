-- Active: 1675696960953@@127.0.0.1@1433

CREATE TABLE
    users (
        id INTEGER PRIMARY KEY UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    );

SELECT * FROM users;

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

    SELECT * FROM products ;

    INSERT INTO products (id, name, price, category)
    VALUES ("03", "Microwaves", "400", "DOMESTIC_APPLIANCES"),
    ("04", "Fridge", "1.000", "DOMESTIC_APPLIANCES" ), 
    ("05", "Television", "1700", "ELECTRONICS"),
    ("06", "Fan", "230", "ELECTRONICS"), 
    ("07", "Humidifier", "580", "ELECTRONICS");