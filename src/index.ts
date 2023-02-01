import { users, products, purchases } from "./database";
import express, { Request, Response } from 'express';
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
    try {
        res.status(200).send(users)

    } catch (error) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error)
    }
});

// busca todos os produtos
app.get('/products', (req: Request, res: Response) => {
    try {
       const result = res.status(200).send(products)
        if (!result) {
            res.status(404) //res.statuscode = 404 (duas formas de serem feitos)
        }

    } catch (error) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error)
    }
});

// busca os produtos pelo nome
app.get('/product/search', (req: Request, res: Response) => {
    try {
        const q = req.query.q as string

        const result = products.filter((product) => {
            return product.name.toLocaleLowerCase().includes(q)
        })

        if (!result) {
            res.status(404) //res.statuscode = 404 (duas formas de serem feitos)
            throw new Error("Produto não encontrado, verifique o nome informado")
        }

        res.status(200).send(result)

    } catch (error) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error)
    }

});

// --Exercício 3 - criar usuarios, produto e compra
app.post('/users', (req: Request, res: Response) => {
    const id = req.body.id as string
    const email = req.body.email as string
    const password = req.body.password as string

    const newUser = {
        id,
        email,
        password
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
        id,
        name,
        price,
        category
    }

    products.push(newProduct)
    res.status(200).send('Produto cadastrado com sucesso')
});

// produtos
app.get('/purchase', (req: Request, res: Response) => {
    const userId = req.body.userId as string
    const productId = req.body.productId as string
    const quatily = req.body.quatily as number
    const totalPrice = req.body.totalPrice as number

    const newPurchase = {
        userId,
        productId,
        quatily,
        totalPrice
    }

    purchases.push(newPurchase)
    res.status(200).send('Compra cadastrado com sucesso')
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

    if(user) {
        user.id = newId || user.id
        user.email = newEmail || user.email
        user.password = newPassword || user.password
    }

    res.status(200).send("Cadastro alterado com sucesso")
   
})


app.put ('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id

    const newId = req.body.id as string | undefined
    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number 
    const newCategory = req.body.category as CATEGORY_PRODUCT | undefined

    const product = products.find((product) => product.id === id)

    if (product) {
        
        product.name = newName || product.name
        product.category = newCategory || product.category

        product.price = isNaN(newPrice) ? product.price : newPrice
    }
    res.status(200).send("Produto atualizado com sucesso")
})






