import { Request, Response } from 'express';
import { OrderServices } from './order.service';


 const createOrder = async (req: Request, res: Response) => {
    try {
        const { email, productId, price, quantity } = req.body;

        if (!email || !productId || !price || !quantity) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required: email, productId, price, quantity',
            });
        }

        const order = await OrderServices.createOrderInDB(email, productId, price, quantity);

        res.status(201).json({
            success: true,
            message: 'Order created successfully!',
            data: order,
        });
    } catch (err) {
        console.error('Error creating order:', err);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: err,
        });
    }
};

export const OrderControllers={
    createOrder
}