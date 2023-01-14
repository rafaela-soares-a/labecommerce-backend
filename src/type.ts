export type TUser = {
    id: string
    email: string
    password: string
}

export type TProduct = {
    id: string
    name: string
    price: number
    category: string
}

export type TPurchase = {
    userld: string
    productld: string
    quatily: number
    totalPrice: number
}