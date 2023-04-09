import { Image } from '@/components/image/image';
import { Order } from '@/components/order/order';
export type BreadBookDTO =  {
    name: string;
    amount: number;
    detail: string;
    price: number;
    createAt?: string | Date | null
    images?: Image[]

}

export type BreadBookUpdate = {

    name?: string 
    amount?: number 
    detail?: string 
    price?:   number 
    createAt?: string | Date 
    orders?: Order[]
    images?: { id? : number, url : string }[]
}