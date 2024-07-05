
import mongoose from 'mongoose';
import { ProductModel } from '../product/product.model';
import { OrderModel } from './order.model';


 const createOrderInDB = async (email: string, productId: string, price: number, quantity: number) => {
    // Validate the product ID
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new Error('Invalid product ID');
    }

    // Find the product by ID
    const product = await ProductModel.findById(productId);
    if (!product) {
        throw new Error('Product not found');
    }

    // Check if the product has enough inventory
    if (product.inventory.quantity < quantity) {
        throw new Error('Not enough inventory available');
    }

    // Create the order
    const order = new OrderModel({ email, productId, price, quantity });
    await order.save();

    // Update the product inventory
    product.inventory.quantity -= quantity;
    await product.save();

    return order;
};

export const OrderServices = {
    createOrderInDB
  };
  