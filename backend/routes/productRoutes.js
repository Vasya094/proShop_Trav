import express from 'express'
import { protect, isAdmin } from '../middleware/authMiddleware.js'
import {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
  reviewProduct,
  getTopProducts,
} from "../controllers/productController.js";
const router = express.Router();

router.route("/").get(getProducts).post(protect, isAdmin, createProduct);
router.route("/:id/reviews").post(protect, reviewProduct);
router.get('/top', getTopProducts)
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, isAdmin, deleteProduct)
  .put(protect, isAdmin, updateProduct);



export default router
