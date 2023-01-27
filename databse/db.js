import mongoose from "mongoose";

const connctDb = async () => {
    const DBURL = "mongodb://localhost:27017/bcrcyptApis"
    try {
        await mongoose.connect(DBURL, {                 
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`{database is connected successfully ${DBURL}}`)
    } catch (error) {
        console.log(`{database error hai ${error}}`)
    }
}
export default connctDb