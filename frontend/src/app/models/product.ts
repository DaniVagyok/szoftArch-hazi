export class Product {
    id: number;
    hasOwner: boolean;
    ownerId: number;
    name: string;
    category: Category;
    set: string;
    imgsrc: string;
}

export enum Category{
    Boots = 'Csizma',
    Pants = 'Nadrág',
    Shirt = 'Ing',
    Vest = 'Mellény',
    Hat = 'Kalap'
}
