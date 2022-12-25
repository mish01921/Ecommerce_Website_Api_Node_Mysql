import express from "express";
import { upload,addProduct, getAllProducts, getPublishedProduct, getProductReviews, getOneProduct, updateProduct, deleteProduct } from "../controllers/productController.js"

import { getAllReviews, addReview } from "../controllers/reviewController.js";

// router
const ProductRouter = express.Router();
// use routers
ProductRouter.post('/addProduct',upload,addProduct)
ProductRouter.get('/allProducts', getAllProducts)
ProductRouter.get('/published', getPublishedProduct)
// Review Url and Controller

ProductRouter.get('/allReviews', getAllReviews)
ProductRouter.post('/addReview/:id', addReview)

// get product Reviews
ProductRouter.get('/getProductReviews/:id', getProductReviews)

// Products ProductRouter
ProductRouter.get('/:id', getOneProduct)
ProductRouter.patch('/:id', updateProduct)
ProductRouter.delete('/:id', deleteProduct)

export default ProductRouter;