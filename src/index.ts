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

    try {
        const id = req.body.id as string
        const email = req.body.email as string
        const password = req.body.password as string

        const newUser = {
            id,
            email,
            password
        }

        const findId = users.find((user) => user.id === id)

        if (findId) {
            res.status(400)
            throw new Error("Id já cadastrado, por favor inserir outro Id")
        }

        const findEmail = users.find((user) => user.email === email)
        if (findEmail) {
            res.status(400)
            throw new Error("Email já cadastrado, por favor insira outra e-mail")
        }

        users.push(newUser)
        res.status(200).send('Cadastro realizado com sucesso')

    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        }
    }

});

app.post('/products', (req: Request, res: Response) => {

    try {
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

        const findId = products.find((product) => product.id === id)
        if (findId) {
            res.status(400)
            throw new Error("Id já cadastrado")
        }

        products.push(newProduct)
        res.status(200).send('Produto cadastrado com sucesso')

    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        }

    }


});

// produtos
app.get('/purchase', (req: Request, res: Response) => {

    try {
        const userId = req.body.userId as string
        const productId = req.body.productId as string
        const price = req.body.price as number
        const quatily = req.body.quatily as number
        const totalPrice = req.body.totalPrice as number

        const newPurchase = {
            userId,
            productId,
            price,
            quatily,
            totalPrice
        }

        const findUserId = purchases.find((purchase) => purchase.userId === userId)

        if (!findUserId) {
            res.status(404)
            throw new Error("O usuário informado não existe, inserir um Id válido")
        }

        const findIdProduct = purchases.find((purchase) => purchase.productId === productId)

        if (!findIdProduct) {
            res.status(404)
            throw new Error("O Id do produto não foi localizado")
        }

        if (findIdProduct.price * quatily === totalPrice) {
            res.status(404)
            throw new Error("Total da compra incorreto")
        }

        purchases.push(newPurchase)
        res.status(200).send('Compra cadastrado com sucesso')

    } catch (error) {

    }

});

// está buscando os produtos pela sua Id:
app.get('/products/:id', (req: Request, res: Response) => {

    try {
        const id = req.params.id

        const result = products.find((product) => product.id === id)

        if (!result) {
            res.status(400)
            throw new Error("Id do produto inválido")
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

// buscar compra pelo id do usuário:
app.get('/users/:id/purchases', (req: Request, res: Response) => {

    try {
        const id = req.params.userId
        const result = purchases.find((purchase) => purchase.userId === id)

        if (!result) {
            res.status(400)
            throw new Error("Id do usuário não localizado")
        }

        res.status(200).send(result)

    } catch (error) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error)

    }

})

// deletar usuário pelo Id
app.delete('/users/:id', (req: Request, res: Response) => {

    try {
        const id = req.params.Id

        const indexToRemove = users.findIndex((user) => user.id === id)

        if (indexToRemove >= 0) {
            users.splice(indexToRemove, 1)
        }

        const findUserById = users.find((user) => user.id === id)

        if (!findUserById) {
            res.status(404)
            throw new Error("Usuário inválido")
        }

        res.status(200).send("Cadastro deletado com sucesso")

    } catch (error) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error)

    }


});

// deletar produtos pelo Id

app.delete('/products/:id', (req: Request, res: Response) => {

    try {
        const id = req.params.id
        const indexToRemove = products.findIndex((product) => product.id === id)
        products.splice(indexToRemove, 1)

        res.status(200).send("Produto removido com sucesso")

    } catch (error) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error)

    }

})

//editar usuário pelo Id
app.put('/users/:id', (req: Request, res: Response) => {

    try {

        const id = req.params.id

        const newId = req.body.id as string | undefined
        const newEmail = req.body.email as string | undefined
        const newPassword = req.body.password as string | undefined

        const user = users.find((user) => user.id === id)

        if(!user) {
            res.status(404)
            throw new Error ("Id do usuário invalida")
        }

        if (user) {
            user.id = newId || user.id
            user.email = newEmail || user.email
            user.password = newPassword || user.password
        }

        res.status(200).send("Cadastro alterado com sucesso")

    } catch (error) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error)

    }


})

//editar compra pelo Id
app.put('/products/:id', (req: Request, res: Response) => {

    try {
        const id = req.params.id

        const newName = req.body.name as string | undefined
        const newPrice = req.body.price as number
        const newCategory = req.body.category as CATEGORY_PRODUCT | undefined

        const product = products.find((product) => product.id === id)

        if(!product){
            res.status(404)
            throw new Error ("Id do produto invalida")  
        }

        if (product) {

            product.name = newName || product.name
            product.category = newCategory || product.category

            product.price = isNaN(newPrice) ? product.price : newPrice
        }
        res.status(200).send("Produto atualizado com sucesso")

    } catch (error) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error)

    }

})






