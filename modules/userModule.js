import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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
    },
    //token define karna jaruri hai same
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})


// with aero function
// const saltRound = 10
// compSchema.pre("save", async (next) =>{
//     if (this.isModified("password")) {
//         this.password = await bcrypt.hash(this.password, saltRound)
//     }
//     next()
// })


//tokeN FUNCTION is defined in controller file in middle(notes pre=> node.js file) mai hai
//to use jwt 1=>schema ,2=> method, 3=>genetaeTokem (which is defined in controller file)

compSchema.methods.generateToken = async function () {
    try {
        //generte toke //sign method takes unique identifier like_id...
        const token = await jwt.sign({ _id: this._id.toString() }, process.env.SECRETE_KEY)
        this.tokens = this.tokens.concat({ token: token })
        await this.save()
        // console.log(token)
        return token
    } catch (error) {
        res.send("the error password", error)
    }
}



//without aero function conveting pass in to hash
const saltRound = 10
compSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, saltRound)
    }
    next()
})




const User = new mongoose.model("User", compSchema)




export default User
