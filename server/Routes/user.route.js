const Router = require("express")
const { createAcc, loginAcc, sendEmail, AddAddress, viewDetails, payment, Orders, viewOrder, cardPayment, Profile, viewuser } = require("../Controllers/user.controller");
const {addTocart, viewCart, removefromCart, updateQuantity, addToWishlist,SingleProduct, viewWishlist, removeFromWishlist, viewProduct, updateCart} = require("../Controllers/product.controllers");
const { viewUser } = require("../Controllers/admin.controllers");
const auth = require("../Middleware/auth");


const userRouter = Router();

userRouter.post("/signup",createAcc);
userRouter.post("/login", loginAcc);
userRouter.post("/email", sendEmail);
userRouter.post("/cart", addTocart);
userRouter.get("/cart/:userId",  viewCart);
userRouter.delete("/cart/:userId/:productId", removefromCart);
userRouter.put("/cart/update", updateQuantity);
userRouter.post("/wishlist",addToWishlist);
userRouter.get("/wishlist/:userId", viewWishlist);
userRouter.delete("/wishlist/:userId/:productId", removeFromWishlist);
userRouter.post("/address", AddAddress);
userRouter.get("/details/:userId", viewDetails);
userRouter.get("/products", viewProduct);
userRouter.post("/orders", Orders);
userRouter.get("/orders/:userId", viewOrder);
userRouter.put("/updatecart/:userId", updateCart);
userRouter.get("/getorder/:userId", viewOrder);
userRouter.get("/getusers", viewUser);
userRouter.post("/cardpayment", cardPayment);
userRouter.put("/profile/:id", Profile);
userRouter.get("/viewuser/:userId", viewuser);
userRouter.get("/singleview/:id", SingleProduct);


module.exports = {userRouter}