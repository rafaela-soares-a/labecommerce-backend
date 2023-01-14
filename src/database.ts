import { TUser } from "./type"
import { TProduct } from "./type"
import { TPurchase } from "./type"

export const users: TUser[] = [
    {
        id: "2r4g5j7t8k9y8n6r4g",
        email: "teste1@teste1.com",
        password: "12345"
    },
    {
        id: "2r4g5j7t8k",
        email: "teste2@teste2.com",
        password: "1234578"
    }
]

export const products: TProduct [] = [
    {
        id: "e2r3r4y485i6o6",
        name: "Phone",
        price: 75,
        category: "Eletronic"
    },
    {
        id: "r4r67t8u9i",
        name:"Mouse",
        price: 45,
        category: "Eletronic"
    } 
]

export const purchase: TPurchase [] = [
    {
    userld: "2r4g5j7t8k9y8n6r4g",
    productld: "e2r3r4y485i6o6",
    quatily: 2,
    totalPrice: 150

    },
    {
        userld: "2r4g5j7t8k",
        productld: "r4r67t8u9i",
        quatily: 2,
        totalPrice: 90
    }
]