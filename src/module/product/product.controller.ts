import { ProductServices } from "./product.service";
import { Request, Response } from "express";
const createProduct= async (req: Request, res: Response) => {
    try {
   
        const  productData = req.body;
     
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

  const getSingleProduct = async (req: Request, res: Response) => {
    try {
      const { studentId } = req.params;
  
      const result = await ProductServices.getSingleProductFromDB(studentId);
  
      res.status(200).json({
        success: true,
        message: "Product fetched successfully!",
        data: result,
      });
    } catch (err) {
      console.log(err);
    }
  };


  const updateSingleProduct = async (req: Request, res: Response) => {
    const { productId } = req.params;
    const updatedData = req.body;

    try {
        const updatedProduct = await ProductServices.updateProductFromDB(productId, updatedData);
        res.status(200).json({
            success: true,
            message: 'Product updated successfully!',
            data: updatedProduct
        });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(400).json({
            success: false,
            
        });
    }
};
  export const ProductControllers = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateSingleProduct
  };
  