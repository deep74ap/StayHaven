const Listing = require("./models/listing.js"); 
const Review = require("./models/review.js"); 
const {listingSchema,reviewSchema } = require("./Scema.js"); 
const ExpressError = require("./utils/ExpressError.js");
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

//TO check isOwner 
module.exports.isOwner = async(req,res,next) =>{
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error" , "You are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();

}

//isReviewAuthor

module.exports.isReviewAuthor = async(req,res,next) =>{
    let {id , reviewId} = req.params;
    const review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error" , "You didn't post this review");
        return res.redirect(`/listings/${id}`);
    }
    next();

}

//ValidateListing middleware
module.exports.validateListing = (req,res,next)=>{
   
    let {error} = listingSchema.validate(req.body);
   
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }
    else{
        next();
    }
}

//Review Validation 
module.exports.validateReview = (req,res,next)=>{
    console.log("Received review data:", req.body);
    let {error} = reviewSchema.validate(req.body);
 
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }
    else{
        next();
    }
}

