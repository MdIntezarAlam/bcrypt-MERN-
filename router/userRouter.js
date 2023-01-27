import express from 'express'
import { loginUser, postApi } from '../controller/userController.js'


const router = express.Router()

router
    .route("/post")
    .post(postApi)

router
    .route("/login")
    .post(loginUser)

export default router