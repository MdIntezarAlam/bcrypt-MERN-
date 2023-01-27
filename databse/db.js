import mongoose from "mongoose";

const connctDb = async () => {
    // const process.env.DBURL = "mongodb://localhost:27017/bcrcyptApis"
    try {
        await mongoose.connect(process.env.DBURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`{database is connected successfully ${process.env.DBURL}}`)
    } catch (error) {
        console.log(`{database error hai ${error}}`)
    }
}
export default connctDb