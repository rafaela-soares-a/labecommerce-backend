import { users, products, purchases } from "./database";
import express, { Request, Response } from 'express';
import cors from 'cors';
import { CATEGORY_PRODUCT } from "./type";
import { db } from "./database/knex";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

//teste de conexão

app.get("/ping", async (req: Request, res: Response) => {
    try {
        res.status(200).send("Pong!")
    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
});

// busca todos os usuários
app.get('/users', async (req: Request, res: Response) => {
    try {
        // const result = await db.raw (`
        // SELECT * FROM users
        // `)

        const result = await db("users")

        res.status(200).send({ users: result })
        // res.status(200).send(users)


    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        }
    }

});

// busca todos os produtos
app.get('/products', async (req: Request, res: Response) => {
    try {

        // const result = await db.raw (`
        //     SELECT * FROM products
        // `)

        const result = await db("products")

        res.status(200).send({ products: result })

    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        }
    }
});

app.get('/purchases', async (req: Request, res: Response) => {
    try {

        const result = await db("purchases")
        res.status(200).send({ purchases: result })

    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        }
    }
});

//--------------------------------------

// busca os produtos pelo nome
app.get('/product/search', async (req: Request, res: Response) => {
    try {
        const q = req.query.q as string

        if (q.length <= 1) {
            res.status(400)
            throw new Error("Name deve possuir mais de um caracter");
        }

        const [products] = await db("products").where({ name: q })

        res.status(200).send({ products: products })

    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

});

// --Exercício 3 - criar usuarios, produto e compra
app.post('/users', async (req: Request, res: Response) => {

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
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

});

app.post('/products', async (req: Request, res: Response) => {

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
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

});

// produtos
app.post('/purchase', async (req: Request, res: Response) => {

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
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
});

// está buscando os produtos pela sua Id:
app.get('/products/:id', async (req: Request, res: Response) => {

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

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

});

app.get ('/purchase/id', async (req: Request, res: Response) => {

    try {
        const userId = req.params.userId
    
      const searchById = purchases.find((purchase)=> purchase.userId === userId)

      if (!searchById) {
        res.status(400)
        throw new Error("Id do produto inválido")
    }


    res.status(200).send(searchById)

        
    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

});

// buscar compra pelo id do usuário:
app.get('/users/:id/purchases', async (req: Request, res: Response) => {

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

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

});

// deletar usuário pelo Id
app.delete('/users/:id', async (req: Request, res: Response) => {

    try {
        const id = req.params.id

        const [user] = await db.raw(`
                SELECT * FROM users
                WHERE id = "${id}"
        `)

        if (!user) {
            throw new Error("id não encontrada")
        }

        await db.raw(`
            DELETE FROM users
                WHERE id = "${id}"
    `)

        res.status(200).send({ message: "User deletado com sucesso" })

        // const indexToRemove = users.findIndex((user) => user.id === id)

        // if (indexToRemove >= 0) {
        //     users.splice(indexToRemove, 1)
        // }


        // res.status(200).send("Cadastro deletado com sucesso")

    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
});

// deletar produtos pelo Id

app.delete('/products/:id', async (req: Request, res: Response) => {

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

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
});

//editar usuário pelo Id
app.put('/users/:id', async (req: Request, res: Response) => {

    try {

        const id = req.params.id

        const newId = req.body.id as string | undefined
        const newEmail = req.body.email as string | undefined
        const newPassword = req.body.password as string | undefined

        const user = users.find((user) => user.id === id)

        if (!user) {
            res.status(404)
            throw new Error("Id do usuário invalida")
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

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
});

//editar compra pelo Id
app.put('/products/:id', async (req: Request, res: Response) => {

    try {
        const id = req.params.id

        const newName = req.body.name as string | undefined
        const newPrice = req.body.price as number
        const newCategory = req.body.category as CATEGORY_PRODUCT | undefined

        const product = products.find((product) => product.id === id)

        if (!product) {
            res.status(404)
            throw new Error("Id do produto invalida")
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

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})






