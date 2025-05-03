const Router = require("express");
const { viewUser, adminLogin, viewSeller, updateStatus, updateSeller, updateProduct } = require("../Controllers/admin.controllers");
const auth = require("../Middleware/auth");


const adminRouter = Router();


adminRouter.get("/users", viewUser);
adminRouter.post("/login", adminLogin);
adminRouter.get("/seller",auth, viewSeller);
adminRouter.get("/viewusers",auth, viewUser);
adminRouter.put("/user/:id/toggle", updateStatus );
adminRouter.put("/seller/:id/toggle", updateSeller );
adminRouter.put("/product/:id/toggle", updateProduct );


module.exports = adminRouter