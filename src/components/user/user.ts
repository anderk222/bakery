import { Role } from "@prisma/client"

import { Order } from '../order/order';

export type User = {

    id: number;
    name: string;
    phone: string;
    email: string;
    role: Role;
    orders? : Order[]
}