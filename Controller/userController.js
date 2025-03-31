const User = require("../models/user.js");


//signup page
module.exports.signUp = (req,res)=>{
    res.render("users/signup.ejs");
};

//Signup
module.exports.signUp = async(req,res)=>{
    try{
        let{username,email,password} = req.body;
        const newUser = new User({email,username});
        const registeredUser = await User.register(newUser,password);
        console.log(registeredUser);
        req.login(registeredUser,(err)=>{
            if(err){
                next(err);
            }
            req.flash("success","User registered Sucessfully");
            res.redirect("/listings");
        });
    
    } catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }

};

//Login page route
module.exports.loginPage = (req,res)=>{
    res.render("users/login.ejs");
};

//Post login
module.exports.loginPost  = async(req,res) =>{
    req.flash("success" , "Welcome! You are logged in.");
    if(res.locals.redirectUrl){
        res.redirect(res.locals.redirectUrl);
    }
    else{
        res.redirect("/listings");
    }
    

};

//Logout route
module.exports.logout = (req,res,next)=>{
    req.logout((err) =>{
      if(err){
        return next(err);
      }
      req.flash("Success","You are logged out");
      res.redirect("/listings");
    
    
    });
};