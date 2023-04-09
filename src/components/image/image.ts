import { BreadBook } from "@prisma/client"

export type Image = {
    
    id: number;
    url: string;
    breadBookId: number;
    breadBook? : BreadBook

} 