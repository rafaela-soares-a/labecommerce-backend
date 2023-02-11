"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchases = exports.products = exports.users = void 0;
const type_1 = require("./type");
exports.users = [
    {
        id: "01",
        email: "teste1@teste1.com",
        password: "12345"
    },
    {
        id: "02",
        email: "teste2@teste2.com",
        password: "1234578"
    }
];
exports.products = [
    {
        id: "01",
        name: "Phone",
        price: 75,
        category: type_1.CATEGORY_PRODUCT.ACCESSORIES
    },
    {
        id: "02",
        name: "Mouse",
        price: 45,
        category: type_1.CATEGORY_PRODUCT.ACCESSORIES
    }
];
exports.purchases = [
    {
        userId: "01",
        productId: "01",
        price: 75,
        quatily: 2,
        totalPrice: 150
    },
    {
        userId: "02",
        productId: "02",
        price: 45,
        quatily: 2,
        totalPrice: 90
    }
];
function createUser(id, email, password) {
    const user = { id, email, password };
    exports.users.push(user);
    console.log(`O usuário ${id} com o email ${email} foi cadastrado com sucesso`);
}
function getAllUsers() {
    exports.users.map((user) => {
        console.table(user);
    });
}
console.log("todos os usuários");
getAllUsers();
function createProduct(id, name, price, category) {
    const product = { id, name, price, category };
    exports.products.push(product);
    console.log(`O seu produto ${name} foi cadastrado com sucesso`);
}
createProduct("p005", "monitor", 900, type_1.CATEGORY_PRODUCT.ELECTRONICS);
function getAllPtoduct() {
    exports.products.map((product) => {
        console.table(product);
    });
}
console.log("busca todos os produtos");
getAllPtoduct();
function getProductById(idToSearch) {
    console.table(exports.products.find(product => product.id === idToSearch));
}
getProductById("p005");
function queryProductsByName(q) {
    return exports.products.filter((product) => {
        return product.name.includes(q);
    });
}
console.table(queryProductsByName);
function createPurchase(userId, productId, quatily, price, totalPrice) {
    const purchase = { userId, productId, price, quatily, totalPrice };
    exports.purchases.push(purchase);
}
console.log("Compra realizada com sucesso");
createPurchase("u001", "p005", 10, 2, 900);
function getAllPurchasesFromUserId(userIdToSearch) {
    return exports.purchases.filter((purchase) => {
        return purchase.userId.includes(userIdToSearch);
    });
}
console.table(getAllPurchasesFromUserId);
//# sourceMappingURL=database.js.map