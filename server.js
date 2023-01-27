import express from 'express'
import connctDb from './databse/db.js'
import userRoute from './router/userRouter.js'
import dotenv from 'dotenv'
const port = process.env.PORT || 5000
import cookieParser from 'cookie-parser'


dotenv.config({ path: 'config/.env' })

// console.log({ path: 'config/.env' });

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use("/api/v1", userRoute)

app.listen(port, () => {
    console.log(`server listinig on localhost ${port}`)
})

connctDb()