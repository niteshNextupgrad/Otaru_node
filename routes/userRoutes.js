import express from 'express'
import { createUser, getUsers, loginUser } from '../controllers/userControllers.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
const userRouter = express.Router()

userRouter.post('/user-resgiter', createUser)
userRouter.post('/user-login', loginUser)
userRouter.get('/all-users', authMiddleware, getUsers)

export default userRouter