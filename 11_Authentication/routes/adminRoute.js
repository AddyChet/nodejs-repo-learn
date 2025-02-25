import express from "express"
import { authMiddleware, isAdminUser } from "../middlewares/authMiddleware.js"
const adminRouter = express.Router()

adminRouter.get("/welcome",authMiddleware, isAdminUser, (req,res)=> {
    // const {username, userId, role} = req.userInfo
    return res.status(200).json({
        success : true,
        msg : "Welcome to the Admin page",
    })
})

export default adminRouter;