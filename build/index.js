"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});
app.get("/ping", (req, res) => {
    res.send("Pong!");
});
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield ("users");
        res.status(200).send({ users: result });
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado ");
        }
    }
}));
app.get('/products', (req, res) => {
    try {
        const result = res.status(200).send(database_1.products);
        if (!result) {
            res.status(404);
        }
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error);
    }
});
app.get('/product/search', (req, res) => {
    try {
        const q = req.query.q;
        const result = database_1.products.filter((product) => {
            return product.name.toLocaleLowerCase().includes(q);
        });
        if (!result) {
            res.status(404);
            throw new Error("Produto não encontrado, verifique o nome informado");
        }
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error);
    }
});
app.post('/users', (req, res) => {
    try {
        const id = req.body.id;
        const email = req.body.email;
        const password = req.body.password;
        const newUser = {
            id,
            email,
            password
        };
        const findId = database_1.users.find((user) => user.id === id);
        if (findId) {
            res.status(400);
            throw new Error("Id já cadastrado, por favor inserir outro Id");
        }
        const findEmail = database_1.users.find((user) => user.email === email);
        if (findEmail) {
            res.status(400);
            throw new Error("Email já cadastrado, por favor insira outra e-mail");
        }
        database_1.users.push(newUser);
        res.status(200).send('Cadastro realizado com sucesso');
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
    }
});
app.post('/products', (req, res) => {
    try {
        const id = req.body.id;
        const name = req.body.name;
        const price = req.body.price;
        const category = req.body.category;
        const newProduct = {
            id,
            name,
            price,
            category
        };
        const findId = database_1.products.find((product) => product.id === id);
        if (findId) {
            res.status(400);
            throw new Error("Id já cadastrado");
        }
        database_1.products.push(newProduct);
        res.status(200).send('Produto cadastrado com sucesso');
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
    }
});
app.get('/purchase', (req, res) => {
    try {
        const userId = req.body.userId;
        const productId = req.body.productId;
        const price = req.body.price;
        const quatily = req.body.quatily;
        const totalPrice = req.body.totalPrice;
        const newPurchase = {
            userId,
            productId,
            price,
            quatily,
            totalPrice
        };
        const findUserId = database_1.purchases.find((purchase) => purchase.userId === userId);
        if (!findUserId) {
            res.status(404);
            throw new Error("O usuário informado não existe, inserir um Id válido");
        }
        const findIdProduct = database_1.purchases.find((purchase) => purchase.productId === productId);
        if (!findIdProduct) {
            res.status(404);
            throw new Error("O Id do produto não foi localizado");
        }
        if (findIdProduct.price * quatily === totalPrice) {
            res.status(404);
            throw new Error("Total da compra incorreto");
        }
        database_1.purchases.push(newPurchase);
        res.status(200).send('Compra cadastrado com sucesso');
    }
    catch (error) {
    }
});
app.get('/products/:id', (req, res) => {
    try {
        const id = req.params.id;
        const result = database_1.products.find((product) => product.id === id);
        if (!result) {
            res.status(400);
            throw new Error("Id do produto inválido");
        }
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error);
    }
});
app.get('/users/:id/purchases', (req, res) => {
    try {
        const id = req.params.userId;
        const result = database_1.purchases.find((purchase) => purchase.userId === id);
        if (!result) {
            res.status(400);
            throw new Error("Id do usuário não localizado");
        }
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error);
    }
});
app.delete('/users/:id', (req, res) => {
    try {
        const id = req.params.Id;
        const indexToRemove = database_1.users.findIndex((user) => user.id === id);
        if (indexToRemove >= 0) {
            database_1.users.splice(indexToRemove, 1);
        }
        const findUserById = database_1.users.find((user) => user.id === id);
        if (!findUserById) {
            res.status(404);
            throw new Error("Usuário inválido");
        }
        res.status(200).send("Cadastro deletado com sucesso");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error);
    }
});
app.delete('/products/:id', (req, res) => {
    try {
        const id = req.params.id;
        const indexToRemove = database_1.products.findIndex((product) => product.id === id);
        database_1.products.splice(indexToRemove, 1);
        res.status(200).send("Produto removido com sucesso");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error);
    }
});
app.put('/users/:id', (req, res) => {
    try {
        const id = req.params.id;
        const newId = req.body.id;
        const newEmail = req.body.email;
        const newPassword = req.body.password;
        const user = database_1.users.find((user) => user.id === id);
        if (!user) {
            res.status(404);
            throw new Error("Id do usuário invalida");
        }
        if (user) {
            user.id = newId || user.id;
            user.email = newEmail || user.email;
            user.password = newPassword || user.password;
        }
        res.status(200).send("Cadastro alterado com sucesso");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error);
    }
});
app.put('/products/:id', (req, res) => {
    try {
        const id = req.params.id;
        const newName = req.body.name;
        const newPrice = req.body.price;
        const newCategory = req.body.category;
        const product = database_1.products.find((product) => product.id === id);
        if (!product) {
            res.status(404);
            throw new Error("Id do produto invalida");
        }
        if (product) {
            product.name = newName || product.name;
            product.category = newCategory || product.category;
            product.price = isNaN(newPrice) ? product.price : newPrice;
        }
        res.status(200).send("Produto atualizado com sucesso");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error);
    }
});
//# sourceMappingURL=index.js.map