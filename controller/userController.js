import User from "../modules/userModule.js"
import bcrypt from 'bcrypt'


export const postApi = async (req, res) => {
    try {
        const user = await User(req.body)
        if (user) {
            res.status(200).json({
                success: true,
                message: "user added successfully",
                user
            })
        }

        await user.save()
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
        const email = req.body.email
        const password = req.body.password
        const user = await User.findOne({ email: email })

        //compare with register password and email

        const isMatch = bcrypt.compare(password, user.password)

        if (isMatch) {
            return res.status(201).json({
                success: true,
                message: "login successfully"
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