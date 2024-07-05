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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err :any) {
        
        res.status(500).json({
            success: false,

            message: err.message,
        });
    }
};


const fetchOrders = async (req: Request, res: Response) => {
    try {
        const email = req.query.email;

        if (email && typeof email === 'string') {
            // If email query parameter is present, fetch orders by email
            const orders = await OrderServices.getOrdersByEmailFromDB(email);
            res.status(200).json({
                success: true,
                message: `Orders fetched successfully for email: ${email}`,
                data: orders,
            });
        } else {
            
            const result = await OrderServices.getAllOrdersFromDb();

            res.status(200).json({
                success: true,
                message: 'All orders fetched successfully!',
                data: result.orders,
                
            });
        }
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error,
        });
    }
};





export const OrderControllers={
    createOrder,
    fetchOrders
}