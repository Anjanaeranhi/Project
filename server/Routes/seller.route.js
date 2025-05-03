const Router = require("express");
const { createSeller, sellerLogin, uploadProduct, profile, updateSellerProfile, viewProduct, deleteProduct } = require("../Controllers/seller.controller");
const upload = require("../Middleware/multer");
const auth = require("../Middleware/auth");

const sellerRouter = Router();

sellerRouter.post("/upload", upload.single('image') ,uploadProduct);
sellerRouter.post("/signup", createSeller);
sellerRouter.post("/login", sellerLogin);
sellerRouter.get("/profile/:userId",auth, profile);
sellerRouter.put("/profile/:id",auth, updateSellerProfile);
sellerRouter.get("/products/:sellerId", viewProduct);
sellerRouter.delete("/delete/:productId/:sellerId", deleteProduct);
sellerRouter.get("/getmyproduct/:sellerId", viewProduct);

module.exports = {sellerRouter}