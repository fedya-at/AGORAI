import express from 'express';
import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';
import {ObjectId} from 'mongoDB';
import mongoose from 'mongoose';
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();


router.route("/").get(getProducts).post(protect, admin, createProduct);
router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);


/*
// @desc fetch all products
// @droute  GET /api/products
// @access public

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({});

    return res.json(products);
  })
);

// @desc fetch oneproducts
// @droute  GET /api/products/:id
// @access public

router.get(
  '/:id([0-9a-fA-F]{24})',
  asyncHandler(async (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id.trim());
    const product = await Product.findById(id);
    if (product) {
      return res.json(product);
    } else {
      return res.status(404).json({ message: 'Product not found' });
      //throw new Error('Product not found');
    }

    //return res.json(product);
  })
);*/

export default router;
