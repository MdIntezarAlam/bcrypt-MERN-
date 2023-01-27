import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const compSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        unique: true,
        required: true,
        trim: true
    }
})


// with aero function
// const saltRound = 10
// compSchema.pre("save", async (next) =>{
//     if (this.isModified("password")) {
//         this.password = await bcrypt.hash(this.password, saltRound)
//     }
//     next()
// })

//without aero function
const saltRound = 10
compSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, saltRound)
    }
    next()
})


const User = new mongoose.model("User", compSchema)




export default User
