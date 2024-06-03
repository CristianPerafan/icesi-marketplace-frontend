import { OrderEntity } from "./order.entity";
import { ProductEntity } from "./product.entity";

export interface OrderItemEntity{
    id: string;
    orderId:string;
    order: OrderEntity;
    productId:string;
    product: ProductEntity;
    quantity: number;
}