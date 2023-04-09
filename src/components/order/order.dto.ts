
import { Prisma } from "@prisma/client"

export type OrderDTO = {
    
    clientId: number
    products: {id : number, amount : number}[]
    typePagementId: number
}

export type OrderUpdate = {

    clientId?: number
    products?: {id : number, amount : number}[]
    typePagementId?: number
}