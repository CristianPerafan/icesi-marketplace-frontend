import { UserEntity } from "./user.entity";

export interface RatingEntity {
    id: string;
    description: string;
    stars : number;
    sellerId: string;
    seller: UserEntity;
    authorId: string;
    author: UserEntity;
}