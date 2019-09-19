const express=require("express");
const router=express.Router()
const userController=require("./controllers/userController.js")
const postController=require("./controllers/postController.js")

router.get("/",userController.home)
router.post("/register",userController.register)
router.post("/login",userController.login)
router.post("/logout",userController.logout)
// post routes
router.get("/create-post",userController.mustBeLoggedIn,postController.viewCreateScreen)
router.post("/create-post",userController.mustBeLoggedIn,postController.create)
router.get("/post/:id",postController.viewSingle)
//profile routes: []
router.get("/profile/:username",userController.ifUserExists,userController.profilePostsScreen)
router.get("/post/:id/edit", postController.viewEditScreen)
router.post("/post/:id/edit", postController.edit)
module.exports=router