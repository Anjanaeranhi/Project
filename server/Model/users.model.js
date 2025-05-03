const { Schema, model } = require("mongoose");

const schema = new Schema({
    name : {type : String, required :true},
    disabled: {type: Boolean, default: false},
    email : {type : String, required :true},
    password : {type : String, required :true},
    confirmpassword : {type : String, required :true},
    role :{type : String, default:"user"},
    cart : [
        {
            id : Number,
            name : String,
            catagory : String,
            description : String,
            image : String,
            price : Number,
            qty : { type: Number, default: 1 },
        }
    ],
    wishlist : [
        {
            id : Number,
            name : String,
            catagory : String,
            description : String,
            image : String,
            price : Number,
            qty : { type: Number, default: 1 },
        }
    ],
    details : [
        {
            firstname : String,
            lastname : String,
            address : String,
            phone : Number
        }
    ],

    orders : [
        {
            products: [
                {
                    name : String,
                    price: Number,
                    qty : Number
                }
            ],
            shippingAddress : [
                {
                    name: String,
                    address : String,
                    phone : Number
                }
            ],
            totalAmount : Number
        }
    ]
},
{timestamps : true})

const userModel = model("Users", schema)

module.exports ={userModel}