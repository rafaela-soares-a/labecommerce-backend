"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchase = exports.products = exports.users = void 0;
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
        category: type_1.Role.ACCESSORIES
    },
    {
        id: "02",
        name: "Mouse",
        price: 45,
        category: type_1.Role.ACCESSORIES
    }
];
exports.purchase = [
    {
        userld: "01",
        productld: "01",
        quatily: 2,
        totalPrice: 150
    },
    {
        userld: "02",
        productld: "02",
        quatily: 2,
        totalPrice: 90
    }
];
function createUser(id, email, password) {
    const user = { id, email, password };
    exports.users.push(user);
    console.log(`O usuário ${id} com o email ${email} foi cadastrado com sucesso`);
}
createUser("r004", "rafaela", "rafa@teste.com");
//# sourceMappingURL=database.js.map