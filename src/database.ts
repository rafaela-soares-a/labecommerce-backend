import { CATEGORY_PRODUCT } from "./type"
import { TUser, TProduct, TPurchase } from "./type"


export const users: TUser[] = [
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
]

export const products: TProduct[] = [
    {
        id: "01",
        name: "Phone",
        price: 75,
        category: CATEGORY_PRODUCT.ACCESSORIES
    },
    {
        id: "02",
        name: "Mouse",
        price: 45,
        category: CATEGORY_PRODUCT.ACCESSORIES
    }
]

export const purchases: TPurchase[] = [
    {
        userId: "01",
        productId: "01",
        quatily: 2,
        totalPrice: 150

    },
    {
        userId: "02",
        productId: "02",
        quatily: 2,
        totalPrice: 90
    }
]

function createUser(id: string, email: string, password: string): void {
    const user: TUser = { id, email, password }
    users.push(user)
    console.log(`O usuário ${id} com o email ${email} foi cadastrado com sucesso`)
}

createUser("r004", "rafaela", "rafa@teste.com");

function getAllUsers(): void {
    users.map((user) => {
        console.table(user)
    })
}

console.log("todos os usuários")
getAllUsers()

function createProduct(id: string, name: string, price: number, category: CATEGORY_PRODUCT): void {
    const product: TProduct = { id, name, price, category }
    products.push(product)
    console.log(`O seu produto ${name} foi cadastrado com sucesso`)
}

createProduct("p005", "monitor", 900, CATEGORY_PRODUCT.ELECTRONICS)

function getAllPtoduct(): void {
    products.map((product) => {
        console.table(product)
    })
}

console.log("busca todos os produtos")

getAllPtoduct()

function getProductById(idToSearch: string): void {
    console.table(
        products.find(product => product.id === idToSearch)
    )
}

getProductById("p005")

function queryProductsByName(q: string): Array<TProduct> {
        return products.filter ((product)=> {
            return product.name.includes(q)
        })
   
}

console.table (queryProductsByName)


function createPurchase (userId: string, productId: string, quatily: number, totalPrice: number): void{
    const purchase: TPurchase = {userId, productId, quatily, totalPrice}
    purchases.push(purchase)
   
}

console.log("Compra realizada com sucesso")

createPurchase("u001", "p005", 2, 900)

function getAllPurchasesFromUserId (userIdToSearch: string): Array<TPurchase>{
    return purchases.filter((purchase)=> {
        return purchase.userId.includes(userIdToSearch)
    })
}

console.table(getAllPurchasesFromUserId)





