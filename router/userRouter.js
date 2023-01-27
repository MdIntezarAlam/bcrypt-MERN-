import express from 'express'
import { loginUser, postApi } from '../controller/userController.js'
import isAuthenticated from '../middleware/isAuthenticated.js'


const router = express.Router()

router
    .route("/register")
    .post(postApi)

router
    .route("/login")
    .post(loginUser)

export default router