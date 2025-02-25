import { User } from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


export const registerUser = async (req,res) => {
    try {     
        if(Object.keys(req.body).length === 0) {
            return res.status(404).json({
                msg : "Please input all the fields are required"
            })   
        }
        const {username, email, password, role} = req.body

        const checkExistingUser = await User.findOne({$or : [{username}, {email}]})
        if(checkExistingUser) {
            return res.status(400).json({
                success: false,
                message : "Username or Email already Exists! Try with Different username or email"
            })
        }

        //hash passowrd

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //create new user and save in db

        const newlyCreatedUser = await User.create({
            username, 
            email,
            password : hashedPassword,
            role : role || 'user'
        })

        if(newlyCreatedUser) {
            res.status(201).json({
                success : true,
                message : "User Created Successfully",
                user : newlyCreatedUser
            })
        }else {
            res.status(400).json({
                success : true,
                message : "Unable to register user. Please try again."
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success : false,
            message : "Something went Wrong!"
        })
    }
}


export const loginUser = async (req,res) => {
    try {
        const {username , password} = req.body 

        //find current user in db
        const findUser = await User.findOne({username})
        if(!findUser) {
            return res.status(400).json({
                success : false,
                msg : "ERROR! User does not exists!"
            })
        }

        //password correct or not
        const isPasswordCorrect = await bcrypt.compare(password, findUser.password)
        if(!isPasswordCorrect) {
            return res.status(400).json({
                success : false,
                msg : "ERROR! Incorrect Password!"
            })
        }

        //create user tokem --JWT
        const accessToken = jwt.sign({
            userId : findUser._id,
            username : findUser.username,
            role : findUser.role
        }, process.env.JWTSECRETKEY, {expiresIn : "30m"})

        return res.status(200).json({
            success : true,
            message : "Logged in successfully",
            accessToken : accessToken
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success : false,
            message : "Something went Wrong!"
        })
    }
}