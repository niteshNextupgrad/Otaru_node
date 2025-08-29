import express from 'express'
import cors from 'cors'
import dbConnect from './dbConfig/config.js'
import adminRouter from './routes/adminRoutes.js'
import dotenv from 'dotenv'
import userRouter from './routes/userRoutes.js'


dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
dbConnect()
app.use("/api", adminRouter);
app.use("/api", userRouter);
// app.use("/api/users", userRouter);

app.listen(8000, () => {
    console.log('server is runnignon port 8000')
})