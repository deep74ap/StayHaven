const Listing = require("../models/listing.js");
const review = require("../models/review.js");

//Post review and show review
module.exports.postReview = async(req,res)=>{
    
    const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return res.status(404).send("Listing not found");
        }

        
        if (!listing.reviews) {
            listing.reviews = [];
        }

        const newReview = new review(req.body.review);
        
        newReview.author = req.user._id;
        console.log(newReview);
        listing.reviews.push(newReview); 
        await newReview.save();

        
        await listing.save();
        req.flash("success","Thanks for your valuable review !");
        console.log("saved");
        console.log("Redirecting to:", `/listings/${listing._id}`);
       
        res.redirect(`/listings/${listing._id}`);
        
};

//Delete revieew
module.exports.destroyReview = async(req,res) => {
    let {id , reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull: {reviews : reviewId}});
    await review.findById(reviewId);
    req.flash("success","Your review deleted successfully !");
    

    res.redirect(`/listings/${id}`)
};