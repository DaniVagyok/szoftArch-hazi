import { Product } from './product';

export class ProductSet {
    id: number;
    name: string;
    items: Product[];
    ownerName: string;
}

export interface INewProductSet {
    name: string;
}

export interface INewRentModel {
    id: number;
    memberId: number;
}
