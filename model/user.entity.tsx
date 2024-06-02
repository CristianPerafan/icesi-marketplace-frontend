import { OrderEntity } from "./order.entity";
import { ProductEntity } from "./product.entity";
import { RatingEntity } from "./rating.entity";

export interface UserEntity {
    id: string;
    email: string;
    name: string;
    lastName: string;
    roles: string[];
    products: ProductEntity[];
    orders: OrderEntity[];
    soldOrders: OrderEntity[];
    ratings: RatingEntity[];
    ratingsGiven: RatingEntity[];
}

export interface CreateUserEntity {
    email: string;
    name: string;
    lastName: string;
    roles: string[];
    password: string;
}


export const userRoles = [
    'buyer',
    'seller',
    'admin'
]