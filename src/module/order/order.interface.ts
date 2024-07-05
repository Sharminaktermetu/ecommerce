import { Schema } from "mongoose";

export interface Order {
    email: string;
    productId: Schema.Types.ObjectId;
    price: number;
    quantity: number;
    createdAt?: Date;
    updatedAt?: Date;
}
