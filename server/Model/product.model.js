const {model, Schema} = require("mongoose");

const schema = new Schema({
    productId: { type: String, unique: true },
    name : {
        type : String,
        required : true
    },
    disabled: {type: Boolean, default: false},
    catagory : {
        type : String,
        required : true
    },
    price :{
        type : Number,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    
    image : {
        type : String,
        required : true
    }
})

const productModel = model("Products", schema )

module.exports = {productModel}