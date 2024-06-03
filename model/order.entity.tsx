import { OrderItemEntity } from "./orderItem.entity";
import { UserEntity } from "./user.entity";

export interface OrderEntity{
    id: string;
    buyerId: string;
    user: UserEntity;
    sellerId: string;
    sellerUser: UserEntity;
    items: OrderItemEntity[];
    accepted: boolean;
}