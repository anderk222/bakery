import { Image } from '@/components/image';

export type BreadBook = {
    id: number;
    name: string;
    amount: number;
    detail: string;
    price: number;
    images : Image[]
    createAt: Date | null;
}