import User from "../modules/userModule.js"
import bcrypt from 'bcrypt'


export const postApi = async (req, res) => {
    try {
        const { name, email, password } = req.body
        let user = await User.findOne({ name })
        if (user) {
            return res.status(400).json({
                success: false,
                message: "user Already Exists"
            })
        }

        user = await User.create({ name, email, password })
        //  genetae Token while register //same on eline code ko paste kar de .compare ke nich in login
        const token = await user.generateToken()
        // console.log("token while register", token)

        //set data in to cookies
        const cookieOption = {
            expires: new Date(Date.now() + 5000),
            httpOnly: true
        }
        res.status(200).cookie("jwt", token, cookieOption).json({
            success: true,
            message: "registered user",
            user,
            token
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//login user  
export const loginUser = async (req, res) => {
    try {
        //find email and pass to loginF
        const { email, password } = req.body
        let user = await User.findOne({ email,password })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user not found"
            })
        }

        //compare with register password and email
        const isMatch = bcrypt.compare(password, user.password)
        //generate token while login 
        const token = await user.generateToken()
        // console.log("token while login", token)
        const cookieOption = {
            expires: new Date(Date.now() + 80 * 44 * 60 * 60 * 1000),
            httpOnly: true
        }

        if (isMatch) {
            return res.cookie("jwt", token, cookieOption).status(201).json({
                success: true,
                message: "login successfully",
                token
            })
        }
        else {
            return res.status(404).json({
                success: false,
                message: "Invalid Login details"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}