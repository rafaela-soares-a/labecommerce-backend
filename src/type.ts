export type TUser = {
    id: string
    email: string
    password: string
}

export type TProduct = {
    id: string
    name: string
    price: number
    category: "ELECTRONICS" | "DOMESTIC_APPLIANCES" | "ACCESSORIES"
}

export type TPurchase = {
    userId: string
    productId: string
    price: number
    quatily: number
    totalPrice: number
}

 export enum CATEGORY_PRODUCT {
    ELECTRONICS = "ELECTRONICS",
    DOMESTIC_APPLIANCES = "DOMESTIC_APPLIANCES",
    ACCESSORIES = "ACCESSORIES"    
 }