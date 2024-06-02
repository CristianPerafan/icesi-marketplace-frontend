export interface ProductEntity {
    id : string;
    name : string;
    description : string;
    category : string;
    price : number;
    image : string;
    sellerId : string;
}



export const ProductCategories = [
    'food',
    'drink',
    'books',
    'electronics',
    'fashion',
    'sports',
    'other'
]