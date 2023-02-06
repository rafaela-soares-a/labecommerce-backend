export type TUser = {
    id: string
    email: string
    password: string
}

export type TProduct = {
    id: string
    name: string
    price: number
    category: "ELECTRONICS" | "CLOTHES_AND_SHOES" | "ACCESSORIES"
}

export type TPurchase = {
    userId: string
    productId: string
    price: number
    quatily: number
    totalPrice: number
}

 export enum CATEGORY_PRODUCT{
    ELECTRONICS = "ELECTRONICS",
    CLOTHES_AND_SHOES = "CLOTHES_AND_SHOES",
    ACCESSORIES = "ACCESSORIES"    
 }