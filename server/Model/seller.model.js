const { model, Schema } = require("mongoose");

const schema = new Schema({
    name : {
        type : String,
        required : true
    },
    disabled: {type: Boolean, default: false},
    role : { type: String, default: "seller" },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    confirm_password : {
        type : String,
        required : true
    },
    product : [
        {
            id : Number,
            name : String,
            catagory : String,
            description : String,
            image : String,
            price : Number,
        }
    ]
}, {timestamps: true});

const sellerModel = model("Sellers" , schema);
module.exports = {sellerModel}