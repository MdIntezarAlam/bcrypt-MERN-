import express from 'express'
import { commentOnpost } from '../controller/postModule.js'
import { loginUser, postApi } from '../controller/userController.js'
import isAuthenticated from '../middleware/isAuthenticated.js'


const router = express.Router()

router
    .route("/register")
    .post(postApi)

router
    .route("/login")
    .post(loginUser)
router
    .route("/comment/:id")
    .post(isAuthenticated,commentOnpost)

export default router