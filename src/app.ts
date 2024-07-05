import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { ProductRoutes } from './module/product/product.route';
import { OrderRoutes } from './module/order/order.route';
const app:Application = express()

// parsers
app.use(express.json())
app.use(cors());
app.use("/api/products/", ProductRoutes);
app.use("/api/orders", OrderRoutes);

app.get('/', (req:Request, res:Response) => {
  res.send('Welcome to e-commerce world.')
}) 

export default app
