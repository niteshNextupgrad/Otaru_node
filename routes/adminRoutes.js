import express from 'express'
import { createAdmin, loginAdmin } from '../controllers/adminControllers.js'
const adminRouter = express.Router()

adminRouter.post('/add-admin', createAdmin)
adminRouter.post('/admin-login', loginAdmin)

export default adminRouter