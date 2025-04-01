const express = require("express");

const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const userController = require("../Controller/userController.js");
const { route } = require("./review.js");

//Router.route for /signup
router.route("/signup")
.get(userController.signUpPage)
.post(wrapAsync(userController.signUp));



// router.get("/signup",userController.signUp);
//Signup route
// router.post("/signup",wrapAsync(userController.signUp));

//Router.route for /login

router.route("/login")
.get(userController.loginPage)
.post(saveRedirectUrl,
    passport.authenticate('local' , {failureRedirect : "/login",failureFlash:true}),
    userController.loginPost);

//Login page route 
// router.get("/login",userController.loginPage);
//Login post route
// router.post("/login",saveRedirectUrl,passport.authenticate('local' , {failureRedirect : "/login",failureFlash:true}),userController.loginPost)

//Logout 
router.get("/logout",userController.logout);

module.exports = router;