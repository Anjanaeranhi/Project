const { productModel } = require("../Model/product.model");
const { userModel } = require("../Model/users.model");

const addTocart = async(req,res) =>{
    try {
        const {userId, product} = req.body;
        // console.log(req.body);
        // const cart = await userModel.findByIdAndUpdate(userId, )
        const user = await userModel.findById(userId);
        if(!user){
            return res.status(400).send({message: "User not found"})
        }

        const productData = await productModel.findById(product._id);
          if (!productData) {
            return res.status(400).send({ message: "Product not found" });
          }

          // Check if the product is disabled
          if (productData.disabled) {
            return res.status(403).send({ message: "This product is currently unavailable." });
          }
        // console.log(user);
        // console.log("User Cart:", JSON.stringify(user.cart, null, 2));

        
        const existInCart = user.cart.find((item) => item?._id.toString() === product?._id);
        if(existInCart){
            return res.status(400).send({message : "Already present in cart"})
        }
        
        // if (user.disabled) {
        //   return res.status(403).send({ message: "Your account is disabled. Please contact support." });
        // }
        user.cart.push(product);
        await user.save();
        // console.log(user.cart);
        
        return res.status(200).send({message: "Product added to the cart", cart : user.cart})
    } catch (error) {
        console.log(error);
        
    }
}

const addToWishlist = async(req,res) =>{
  try {
    const {userId, product} = req.body;
    // console.log(req.body);

    const user = await userModel.findById(userId);
    
    if(!user){
      return res.status(400).send({message: " User not found"})
    }
    // console.log(product.id);
    const productData = await productModel.findById(product._id);
    if (!productData) {
      return res.status(400).send({ message: "Product not found" });
    }

    // Check if the product is disabled
    if (productData.disabled) {
      return res.status(403).send({ message: "This product is currently unavailable." });
    }
    const exist =  user.wishlist.find((item)=>item?._id.toString() === product?._id);
    if(exist) {
      console.log("exist",exist);
      return res.status(400).send({message:"already in wishlist"}); 
    }

    user.wishlist.push(product);
    await user.save();

    return res.status(200).send({message: "Product added to wishlist"})
    
  } catch (error) {
    console.log(error);
    // toast.error(error)
  }
};

const viewWishlist = async(req,res) =>{
  const { userId } = req.params;
  console.log("UserIddDDddddddddddd : ",userId);
  
  try {
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).send({ message: "User not found" });
    
    res.status(200).send(user.wishlist); 
  } catch (err) {
    res.status(500).send({ message: "Internal server error" ,err});
  }
}

const removeFromWishlist = async(req,res) =>{
  const {userId, productId} =req.params
  // console.log(userId);
  try {
  const user = await userModel.findById(userId);
  // console.log(user);
  
  if(!user){
    return res.status(400).send({message:"User not found"})
  }
  // const product = user.wishlist.find((item)=> item.id==productId);
  // if(!product){
  //   return res.status(400).send({message:"Product is not in wishlist"})
  // }

  const index = user.wishlist.findIndex((item) => item?._id.toString() === productId);
    if (index === -1) {
      return res.status(400).send({ message: "Product not found in wishlist" });
    }

    
    user.wishlist.splice(index, 1);
    await user.save();

    return res.status(200).send({message:"Product removed from wishlist",user});

  
    
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
}

const removefromCart = async(req,res) =>{
    const {userId, productId} = req.params;
    // console.log(productId);
    const user = await userModel.findById(userId);
    if(!user){
        return res.status(400).send({message: "User not found"})
    }
    // console.log(user);

    const thing = user.cart.find(item => item._id.toString() === productId);
    console.log(thing);
    
    // console.log("User Cart:", JSON.stringify(user.cart, null, 2));

    const index = user.cart.findIndex((item) => item._id.toString() === productId);
    if (index === -1) {
      return res.status(400).send({ message: "Product not found in cart" });
    }

    
    user.cart.splice(index, 1);
    await user.save();
    // console.log(user.cart);
    
    return res.status(200).send({message: "Product removed from the cart", product: thing})
    
}



const viewCart = async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await userModel.findById(userId);
      if (!user) return res.status(404).send({ message: "User not found" });
      
      res.status(200).send(user.cart); // assuming user.cart holds the cart items
    } catch (err) {
      res.status(500).send({ message: "Internal server error" });
    }
  }

  const updateQuantity = async (req, res) => {
    try {
      const { product, type, userId } = req.body;
      // console.log(product, type, userId);
  
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
  
      const item = user.cart.find((item) => item._id.toString() === product._id);
      if (!item) {
        return res.status(404).send({ message: "Product not found in cart" });
      }
  
      if (type === "inc") {
        item.qty += 1;
      } else if (type === "dec") {
        item.qty = Math.max(1, item.qty - 1); 
      }
  
      await user.save();
      return res.status(200).send({ message: "Quantity updated", cart: user.cart });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal server error" });
    }
  };


  const viewProduct = async(req,res) =>{
    try {
      const product = await productModel.find();
      if(!product){
        return res.status(400).send({message: "No product found"})
      }
      return res.status(200).send({message:"Products", product})
    } catch (error) {
      console.log(error);
      returnres.status(500).send({message:'Internal server error'})
    }
  }


  const updateCart = async(req,res) =>{
    try {
      const { orderedProductIds } = req.body;
      const { userId } = req.params;
      console.log(orderedProductIds);
      

      const user = await userModel.findById(userId);

      if (!user) return res.status(404).json({ message: "User not found" });

      console.log(user.cart);
      
      user.cart = user.cart.filter(item => !orderedProductIds.includes(item?._id.toString()));
      
      console.log("after", user.cart);
      

      await user.save();

      return res.status(200).send({message: "Ordered items removed from cart"})
    } catch (error) {
      console.log(error);
      return res.status(500).send({message:'Internal server error'})
    }
  }
  

  // const updateCart = async (req, res) => {
  //   try {
  //     const { orderedProductIds } = req.body;
  //     const { userId } = req.params;
  
  //     // Check if orderedProductIds is a valid array
  //     if (!Array.isArray(orderedProductIds)) {
  //       return res.status(400).json({ message: 'orderedProductIds should be an array' });
  //     }
  
  //     // Filter out null or undefined values from orderedProductIds
  //     const validOrderedProductIds = orderedProductIds.filter(id => id !== null && id !== undefined);
  
  //     if (validOrderedProductIds.length !== orderedProductIds.length) {
  //       console.log("Warning: Some invalid product IDs were removed.");
  //     }
  
  //     const user = await userModel.findById(userId);
  //     if (!user) return res.status(404).json({ message: "User not found" });
  
  //     // Ensure orderedProductIds are strings and map them
  //     const orderedProductIdsAsStrings = validOrderedProductIds.map(id => id.toString());
  
  //     // Log the orderedProductIds to ensure they are correct
  //     console.log("Ordered Product IDs:", orderedProductIdsAsStrings);
  
  //     // Log the current cart before update
  //     console.log("Before Update:", user.cart);
  
  //     // Filter out items whose _id (as string) is in the orderedProductIds list
  //     user.cart = user.cart.filter(
  //       item => !orderedProductIdsAsStrings.includes(item._id.toString())
  //     );
  
  //     // Log the cart after update
  //     console.log("After Update:", user.cart);
  
  //     // Save the updated user data to the database
  //     const updatedUser = await user.save();
  //     console.log("User after save:", updatedUser);
  
  //     return res.status(200).send({ message: "Ordered items removed from cart" });
  //   } catch (error) {
      // console.log(error);
      // return res.status(500).send({ message: 'Internal server error' });
  //   }
  // };


  const SingleProduct = async(req,res) =>{
    try {
      const {id} = req.params;
      console.log(id);

      const product = await productModel.findById(id);
      if(!product){
        return res.status(400).send({mesage: "No product found"})
      }
      return res.status(200).send(product)
      
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: 'Internal server error' });
    }
  }
  
  
  

  

module.exports = {SingleProduct, addTocart, viewCart, removefromCart, updateQuantity, updateCart, addToWishlist, viewWishlist , removeFromWishlist, viewProduct}