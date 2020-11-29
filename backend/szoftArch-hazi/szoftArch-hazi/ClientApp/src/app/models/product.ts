import { Interface } from 'readline';

export class Product {
    id: number;
    hasOwner: boolean;
    ownerId: number;
    name: string;
    category: string;
    set: string;
    imgsrc: string;
}

export interface INewProductModel {
    name: string;
    category: string;
}
