
import mongoose from 'mongoose';
import { ProductModel } from '../product/product.model';
import { OrderModel } from './order.model';


 const createOrderInDB = async (email: string, productId: string, price: number, quantity: number) => {

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new Error('Invalid product ID');
    }

    const product = await ProductModel.findById(productId);
    if (!product) {
        throw new Error('Product not found');
    }

    // Check if the product has enough inventory
    if (product.inventory.quantity < quantity) {
        throw new Error('Insufficient quantity available in inventory');
    }

    // Create the order
    const order = new OrderModel({ email, productId, price, quantity });
    await order.save();

    // Update the product inventory
    product.inventory.quantity -= quantity;
    await product.save();

    return order;
};


const getAllOrdersFromDb = async () => {
    try {
       
        const orders = await OrderModel.find()
            .select('email productId price quantity')
           

        const totalOrders = await OrderModel.countDocuments();

        return {
            orders,
            totalOrders,
           
        };
    } catch (error) {
        console.error('Error fetching all orders:', error);
        throw new Error('Failed to fetch orders from the database');
    }
};



const getOrdersByEmailFromDB = async (email: string) => {
    try {
        return await OrderModel.find({ email }).select('email productId price quantity');
    } catch (error) {
        console.error('Error fetching orders by email:', error);
        throw new Error('Failed to fetch orders by email');
    }
};
export const OrderServices = {
    createOrderInDB,
    getAllOrdersFromDb,
    getOrdersByEmailFromDB
  };
  