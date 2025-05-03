const { adminModel } = require("../Model/admin.model");
const { productModel } = require("../Model/product.model");
const { sellerModel } = require("../Model/seller.model");
const { userModel } = require("../Model/users.model");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const viewUser = async(req,res)=>{
    try {
      const user = await userModel.find();
      if(!user){
        return res.status(400).send({message: "UserList is empty"})
      }
      return res.status(200).send({user});
    } catch (error) {
      console.log(error);
      return res.status(500).send({message:"Internal server error"})
    }
  }

  const adminLogin = async(req,res) =>{
    try {
      const {email,password} = req.body;  //123123
      // const one = await bcrypt.hash(password, 10)
      // console.log(one);
      
      exist = await adminModel.findOne({email})
      if(!exist){
        return res.status(400).send({message : "Admin Only"})
      }
      const pass = await bcrypt.compare(password, exist.password);
      if(!pass){
        return res.status(400).send({message:"Password doesn't match"})
      }
      const token = jwt.sign({sub: exist}, process.env.SEC_KEY, {expiresIn:"7d"});
      // console.log("Token",token);
      
      return res.status(200).send({message:"Admin Logged in successfully", token})
    } catch (error) {
      console.log(error);
      return res.status(500).send({message:"Internal server error"})
    }
  }


const viewSeller = async(req,res) =>{
  try {
    const seller = await sellerModel.find();
    if(!seller){
      return res.status(400).send({message:"No seller found"})
    }
    return res.status(200).send(seller)
  } catch (error) {
    console.log(error);
    return res.status(500).send({message:"Internal server error"})
  }
}

const updateStatus = async(req,res) =>{
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.disabled = !user.disabled; 
    await user.save();
    res.status(200).json({ message: `User ${user.disabled ? 'disabled' : 'enabled'}` });
  } catch (error) {
    console.log(error);
    return res.status(500).send({message:"Internal server error"})
  }
}
 
const updateSeller = async (req, res) => {
  try {
    // const id = req.params
    // console.log(id);
    
    const seller = await sellerModel.findById(req.params.id);
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    if (typeof seller.disabled !== 'boolean') {
      return res.status(400).json({ message: "Invalid disabled field in the seller schema" });
    }

    seller.disabled = !seller.disabled;
    await seller.save();

    res.status(200).json({ message: `Seller ${seller.disabled ? 'disabled' : 'enabled'}` });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal server error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    
    // const {id} = req.params
    // console.log("idddddddddddddddddddddddddd", id);
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    // console.log(product.disabled);
    
    if (typeof product.disabled !== 'boolean') {
      return res.status(400).json({ message: "Invalid disabled field in the product schema" });
    }

    product.disabled = !product.disabled;
    await product.save();

    res.status(200).json({ message: `Product ${product.disabled ? 'disabled' : 'enabled'}` });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = {viewUser, adminLogin, viewSeller, updateStatus, updateSeller, updateProduct}
