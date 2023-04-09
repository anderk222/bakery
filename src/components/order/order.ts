import { User } from "@/components/user/user";
import { Order as O, BreadBook, Catalogue, BreadBookOnOrders } from "@prisma/client";


export type Order = O & {
    products: (BreadBookOnOrders & { product: BreadBook })[]
    typePagement: Catalogue;
    client: User;
}