import { Schema, model } from 'mongoose';
import { Order } from './order.interface';


const orderSchema = new Schema<Order>({
    email: { type: String, required: true },
    productId: { type: Schema.Types.ObjectId, ref: 'product', required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
}, {
    timestamps: true
});

export const OrderModel = model<Order>('Order', orderSchema);