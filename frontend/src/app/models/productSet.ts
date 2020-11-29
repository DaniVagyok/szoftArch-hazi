import { Product } from "./product";

export class ProductSet{
    id: number;
    name: string;
    products: Product[];
    hasOwner:boolean;
    ownerId: number;
}

export interface INewProductSet{
    name: string;
}

export interface INewRentModel{
    id: number,
    memberId: number
}