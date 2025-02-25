import 'dotenv/config'
import express from "express"
import connectToDB from './database/db.js'
import authRouter from './routes/authRoute.js'
import homeRouter from './routes/homeRoute.js'
import adminRouter from './routes/adminRoute.js'
connectToDB()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use("/api/auth", authRouter)
app.use("/api/home", homeRouter)
app.use("/api/admin", adminRouter)

app.listen(PORT, ()=> console.log(`Server is listening to port ${PORT}`))