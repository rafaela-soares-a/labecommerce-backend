import { users } from "./database";
import { products } from "./database";
import { purchases } from "./database";
import express, { Request, response, Response } from 'express';
import cors from 'cors';
import { CATEGORY_PRODUCT } from "./type";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong!");
});

// busca todos os usuários
app.get('/users', (req: Request, res: Response) => {
    res.status(200).send(users)
});

// busca todos os produtos
app.get('/products', (req: Request, res: Response) => {
    res.status(200).send(products)
});

// busca os produtos pelo nome
app.get('/product/search', (req: Request, res: Response) => {
    const q = req.query.q as string

    const result = products.filter((product) => {
        return product.name.toLocaleLowerCase().includes(q)
    })
    res.status(200).send(result)
});

// --Exercício 3 - criar usuarios, produto e compra
app.post('/users', (req: Request, res: Response) => {
    const id = req.body.id as string
    const email = req.body.email as string
    const password = req.body.password as string

    const newUser = {
        id: id,
        email: email,
        password: password
    }

    users.push(newUser)

    res.status(200).send('Cadastro realizado com sucesso')
});

app.post('/products', (req: Request, res: Response) => {
    const id = req.body.id as string
    const name = req.body.name as string
    const price = req.body.price as number
    const category = req.body.category as CATEGORY_PRODUCT

    const newProduct = {
        id: id,
        name: name,
        price: price,
        category: category
    }

    products.push(newProduct)
    res.status(200).send('Produto cadastrado com sucesso')
});


// está buscando os produtos pela sua Id:
app.get('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const result = products.find((product) => product.id === id)

    res.status(200).send(result)
});

// buscar compra pelo id do usuário:
app.get('/users/:id/purchases', (req: Request, res: Response) => {
    const id = req.params.userId
    const result = purchases.find((purchase) => purchase.userId === id)

    res.status(200).send(result)
})

// deletar usuário pelo Id
app.delete('/users/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const indexToRemove = users.findIndex((user) => user.id === id)
    if (indexToRemove >= 0) {
        users.splice(indexToRemove, 1)
    }
    res.status(200).send("Cadastro deletado com sucesso")

});

// deletar produtos pelo Id

app.delete('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const indexToRemove = products.findIndex((product) => product.id === id)
    products.splice(indexToRemove, 1)

    res.status(200).send("Produto removido com sucesso")
})

app.put('/users/:id', (req: Request, res: Response) => {
    const id = req.params.id

    const newId = req.body.id as string | undefined
    const newEmail = req.body.email as string | undefined
    const newPassword = req.body.password as string | undefined

    const user = users.find((user) => user.id === id)

})






