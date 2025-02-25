import express from "express"
import { authMiddleware } from "../middlewares/authMiddleware.js"
const homeRouter = express.Router()

homeRouter.get("/welcome", authMiddleware, (req,res)=> {
    const {username, userId, role} = req.userInfo
    return res.status(200).json({
        success : true,
        msg : "Welcome to the Home page",
        user : {
            _id : userId,
            username,
            role
        }
    })
})

export default homeRouter;