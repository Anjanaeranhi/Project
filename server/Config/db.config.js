const {connect} = require("mongoose")
const env = require("dotenv")

env.config()
const connect_DB = async () =>{
    try{
        // const URL = process.env.CLOUD_URL;
        // if(!URL){
        //     console.log("URL not found");
        // }
        const {connection} = await connect(process.env.MONGO_URL, {
            dbName : "Ecommerce"
        })
        console.log("Conneced to", connection.db.databaseName);
        
    }
    catch(err){
        console.log(err);
    }
}
module.exports = {connect_DB}