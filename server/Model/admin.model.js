const {Schema, model} = require("mongoose")


const schema = new Schema({
    name : {
    type:  String,
    required : true
    },
    role : { type: String, default: "admin" },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    
}
);

const adminModel = model("Admin", schema);
module.exports = {adminModel}


