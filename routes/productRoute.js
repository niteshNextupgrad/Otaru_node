import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { addProduct, getProducts } from '../controllers/productControllers.js'
const productRouter = express.Router()

productRouter.post('/add-product', authMiddleware, addProduct)
productRouter.get('/all-products', authMiddleware, getProducts)

export default productRouter