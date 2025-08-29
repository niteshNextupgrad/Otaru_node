import express from 'express'
import cors from 'cors'
import dbConnect from './config/dbConfig.js'
import adminRouter from './routes/adminRoutes.js'
import dotenv from 'dotenv'
import userRouter from './routes/userRoutes.js'
import fileUpload from 'express-fileupload'
import productRouter from './routes/productRoute.js'


dotenv.config()
const app = express()
app.use(cors())
app.use(fileUpload({ useTempFiles: true, }))
app.use(express.json())

dbConnect()
app.use("/api", adminRouter);
app.use("/api", userRouter);
app.use("/api", productRouter);
// app.use("/api/users", userRouter);

app.listen(8000, () => {
    console.log('server is runnignon port 8000')
})