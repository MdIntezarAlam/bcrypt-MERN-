import User from "../modules/userModule.js";
import jwt from 'jsonwebtoken'

const isAuthenticated = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        //if token not found return err
        if (token) {
            return res.status(400).json({
                message: "please login first",
            })
        }
        //if token matched then decode and verify with register
        const decode = await jwt.verify(token, process.env, SECRETE_KEY)
        //And save it to the module
        req.user = await User.findOne(decode._id)

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export default isAuthenticated
