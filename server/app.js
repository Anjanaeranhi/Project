const express = require("express")
const cors = require("cors")
const env = require('dotenv')
const { connect_DB } = require("./Config/db.config")
const { userRouter } = require("./Routes/user.route")
const adminRouter = require("./Routes/admin.route")
const { sellerRouter } = require("./Routes/seller.route")

env.config()

const app = express()
app.use(cors())
app.use(express.json({limit: "50mb"}))


connect_DB()

app.use("/",userRouter);
app.use("/admin",adminRouter);
app.use("/seller", sellerRouter);
app.use('/uploads', express.static('uploads'));


// app.use("/user", productRouter)
app.listen(8080, (err)=>{
    if(err){
        console.log(err); 
        process.exit(1)
    }
    console.log("Running in port", 8080);
    
})

