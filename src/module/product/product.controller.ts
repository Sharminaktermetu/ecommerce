import { ProductServices } from "./product.service";
import { Request, Response } from "express";
const createProduct= async (req: Request, res: Response) => {
    try {
   
        const { product: productData} = req.body;
     
        const result = await ProductServices.createProductIntoDB(productData);
        res.status(200).json({
            success: true,
            message: "Product is created successfully",
            data: result,
          });
      
      } catch (err) {
        console.log(err);
      }
  };
  const getAllProducts = async (req: Request, res: Response) => {
    try {
      const result = await ProductServices.getAllProductsFromDB();
  
      res.status(200).json({
        success: true,
        message: "Products fetched successfully!",
        data: result,
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const ProductControllers = {
    createProduct,
    getAllProducts
  };
  