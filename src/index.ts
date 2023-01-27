import { users } from "./database";
import { products } from "./database";
import { purchases } from "./database";
import express, { Request, response, Response} from 'express';
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

app.get ('/users', (req: Request, res: Response)=> {
    res.status(200).send(users)
});

app.get ('/products', (req: Request, res: Response)=> {
    res.status(200).send(products)
});

app.get ('/product/search', (req: Request, res: Response)=> {
    const q = req.query.q as string

    const result =  products.filter ((product)=>{
        return product.name.toLocaleLowerCase().includes(q)
    })
    res.status(200).send(result)
});

// --Exercício 3 - criar usuarios, produto e compra
app.post ('/users',(req: Request, res: Response) => {
    const id = req.body.id as string
    const email = req.body.email as string
    const password = req.body.password as string

    const newUser = {
        id: id,
        email: email,
        password: password
    }

    users.push(newUser)

    res.status(201).send('Cadastro realizado com sucesso')
});

app.post ('/products', (req: Request, res: Response) => {
    const id = req.body.id as string
    const name = req.body.name as string
    const price = req.body.price as number
    // const category = req.body.category as string

    const newProduct = {
        id: id,
        name: name,
        price: price
    }
    // products.push(newProduct)

    
})





