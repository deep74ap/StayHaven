module.exports.isLoggedIn = (req,res,next) =>{

    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "Please login to add your listings");
        return res.redirect("/login");
    }
    next();
}

//redirectUrl Save 
module.exports.saveRedirectUrl = (req,res,next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}