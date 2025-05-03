const { default: mongoose } = require("mongoose");
const { productModel } = require("../Model/product.model")
const { sellerModel } = require("../Model/seller.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');

// const addProduct = async(req,res, next) =>{
//     try {
//         const {name, catagory, description, price} = req.body
//         // console.log(req.body);

//         const imagePath = req.file? `/uploads/${req.file.filename}` : null;

//         if(!imagePath){
//             return res.status(400).send({message:"Image upload failed"})
//         }

//         const product = await productModel.create({
//             name, catagory, description, price, image: imagePath
//         });
//         next();
//         return res.status(200).send({message: "Product Uploaded", product})
//     } catch (error) {
//         console.log(error);
//     }
// };


const createSeller = async(req,res) =>{
    try {
        let {name, email, password, confirm_password} = req.body;
        // console.log(req.body);
        const exist = await sellerModel.findOne({email});
        if(exist){
            return res.status(400).send({message:"User already exist"});

        }
        const hashed_password = await bcrypt.hash(password,10);
        const seller = await sellerModel.create({name, email, password: hashed_password, confirm_password});
        return res.status(200).send({message:"Seller Created", seller})
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:"Internal server error"})
    }
}

const sellerLogin = async(req,res) =>{
    try {
        const {body} = req;
        // console.log(body);
        const {email,password} = req.body;
        const user = await sellerModel.findOne({email});
        if(!user){
            return res.status(404).send({message:"User not found"})
        }
        if (user.disabled) {
          return res.status(403).send({ message: "Your account is disabled. Please contact support." });
        }
        const exist = await bcrypt.compare(password, user.password);
        if(!exist){
            return res.status(404).send({message: "passwords doesn't match"})
        }
        const token = jwt.sign({sub: user}, process.env.SEC_KEY, {expiresIn:"7d"});
        return res.status(200).send({message: "Logged In successfully", user, token})
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({message: "Internal server error"})
        
    }
}


// const addProductToseller = async (req, res) => {
//     try {
//       const { sellerId, name, catagory, description, price } = req.body;
//       console.log('Received request to add product:', sellerId, name, catagory, description, price);
  
//       const seller = await sellerModel.findById(sellerId);
  
//       if (!seller) {
//         return res.status(400).send({ message: "Seller not found" });
//       }
  
//       const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
//       if (!imagePath) {
//         return res.status(400).send({ message: "Image upload failed" });
//       }
  
//       const duplicate = seller.product.find(
//         (item) => item.name === name && item.price === price
//       );
//       if (duplicate) {
//         return res.status(400).send({ message: "Product already exists in seller's list" });
//       }
  
//       seller.product.push({ name, catagory, description, price, image: imagePath });
//       await seller.save();
  
//       return res.status(200).send({ message: "Product added to seller module" });
  
//     } catch (error) {
//       console.error('Error occurred:', error.message);
//       if (!res.headersSent) {
//         return res.status(500).send({ message: "Internal server error" });
//       }
//     }
//   };
  
const uploadProduct = async (req, res) => {
    try {
      const { sellerId, name, catagory, description, price } = req.body;
      console.log(req.body);
      
  
      const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
      if (!imagePath) {
        return res.status(400).send({ message: "Image upload failed" });
      }
  
     
      const seller = await sellerModel.findById(sellerId);
      if (!seller) {
        return res.status(404).send({ message: "Seller not found" });
      }
      // console.log("name",name);
      
      // console.log("seller product name",seller.product[0].name);
      
      // Check if product already exists in seller's list
      const duplicate = seller.product.find(
        (item) => item.name === name 
        
        
      );
      if (duplicate) {
        return res.status(400).send({ message: "Product already exists in seller list" });
      }

      const productId = uuidv4();

      const product = await productModel.create({
        productId,
        name,
        catagory,
        description,
        price,
        image: imagePath,
      });
      console.log("saved", product);
  
      // Add to seller's product array
      seller.product.push({
        productId,
        name,
        catagory,
        description,
        price,
        image: imagePath,
      });
  
      await seller.save();
  
      return res.status(200).send({
        message: "Product uploaded successfully",
        product,
      });
    } catch (error) {
      console.error("Error in uploadProduct:", error.message);
      return res.status(500).send({ message: "Internal server error" });
    }
  };

  const profile = async(req,res) =>{
    try {
      const {userId} = req.params;
      // console.log(userId);
      
      const user = await sellerModel.findById(userId);
      if(!user){
        return res.status(400).send({message: "Seller not found"})
      }
      console.log(user);
      
      return res.status(200).send({message: "Seller", user})
    } catch (error) {
      console.error("Error in uploadProduct:", error.message);
      return res.status(500).send({ message: error.message });
    }
  }


  const updateSellerProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        
        

        const updatedSeller = await sellerModel.findByIdAndUpdate(
            id,
            { name, email },
            { new: true }
        );

        res.status(200).json({ message: "Seller updated", updatedSeller });
    } catch (error) {
        res.status(500).json({ error: "Update failed" });
    }
};
  

const viewProduct = async (req, res) => {
  try {
    const { sellerId } = req.params;

    
    const seller = await sellerModel.findById(sellerId).select('product');

  
    if (!seller) {
      return res.status(404).json({ error: "Seller not found" });
    }

   
    return res.status(200).send({
      message: "Seller found",
      products: seller.product, 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error. Couldn't fetch products." });
  }
};


// const deleteProduct = async(req,res) =>{
//   try {
//     const {productId, sellerId }= req.params;
    // console.log(productId);
    // console.log(sellerId);
//     const {title} = req.body;
//     console.log(title);
    
//     const product = await productModel.findOne({name: title});
//     if(!product){
//       return res.status(404).send({message:"product not found"})
//     }
//     console.log(product);

//     await productModel.deleteOne({name: title});
    
    
//     const seller = await sellerModel.findById(sellerId);

//     // console.log("Fetched product:", product);
//     if(!seller) {
//       return res.status(404).send({message:"Product not found"})
//     };
    
//     // await productModel.findByIdAndDelete(productId);
//     console.log(product);
    

//     // const seller = await sellerModel.findById(sellerId);
//     // if(!seller){
//     //   return res.status(400).send({message:"No seller found"})
//     // }

//     seller.product = seller.product.filter(
//       (p) => p._id.toString() !== productId
//     );
//     await seller.save();
//     await product.save();

//     return res.status(200).send({message: "Product deleted succesfully"})
    
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }

const deleteProduct = async (req, res) => {
  try {
    const { productId, sellerId } = req.params;
    const { name } = req.body;

    console.log("Product ID:", productId);
    console.log("Seller ID:", sellerId);
    console.log("Product Name:", name);

    
    const product = await productModel.findOneAndDelete({ name });
    if (!product) {
      return res.status(404).json({ message: "Product not found by name" });
    }

    
    const seller = await sellerModel.findById(sellerId);
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

   
    // seller.product = seller.product.filter(
    //   (p) => p.toString() !== productId
    // );

    index = seller.product.findIndex(item => item.name == name);

    if(index === -1) {
      return res.status(400).send({message:"No product in seller's productlist"})
    }

    seller.product.splice(index, 1);

    // seller.product.filter((p) => p.name !== name);

    // console.log("seller producttttttttttttttttttt", seller.product);
    

    await seller.save();

    return res.status(200).json({ message: "Product deleted successfully" });

  } catch (error) {
    console.error("Delete Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = {profile, createSeller, sellerLogin, uploadProduct, updateSellerProfile, viewProduct, deleteProduct}