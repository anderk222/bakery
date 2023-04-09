import { Order } from "@/components/order/order"

export type Catalogue = {
    id : number
    name : string
    type : string
    createAt : Date
    orders? : Order[]

}