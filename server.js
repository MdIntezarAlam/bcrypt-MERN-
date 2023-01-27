import express from 'express'
import connctDb from './databse/db.js'
import userRoute from './router/userRouter.js'
const port = process.env.PORT || 5000


const app = express()
app.use(express.json())

app.use("/api/v1", userRoute)

app.listen(port, () => {
    console.log(`server listinig on localhost ${port}`)
})

connctDb()