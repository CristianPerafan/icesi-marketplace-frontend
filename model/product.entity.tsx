import { UserEntity } from "./user.entity";

export interface ProductEntity {
    id : string;
    name : string;
    description : string;
    category : string;
    price : number;
    image : string;
    sellerId : string;
    user : UserEntity;
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