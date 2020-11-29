import { Interface } from 'readline';

export class Product {
    id: number;
    ownerName: string;
    name: string;
    categoryName: string;
}

export interface INewProductModel {
    name: string;
    categoryId: number;
    file: File;
}

export class Category{
    id: number;
    name: string;
}
