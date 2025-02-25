import 'dotenv/config'
import express from "express"
import { connectToDB } from './database/db.js'
import router from './routes/bookRoutes.js'

const app = express()

const PORT = process.env.PORT || 3000
//conncects to db
connectToDB()

//parses json middleware
app.use(express.json())
app.use("/api/books", router)
app.listen(PORT, ()=> console.log(`Server is running on PORT ${PORT}`))