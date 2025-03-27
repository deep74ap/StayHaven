const express = require("express");
const router = express.Router();

const methodOverride = require("method-override");

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Joi = require('joi');
const {listingSchema } = require("../Scema.js"); 
// const reviewSchema = require("./Scema.js");
const review = require("../models/review.js"); 

const Listing = require("../models/listing.js"); 
console.log("Listing Schema Import Check:", Listing);


const { log } = require("console");



const validateListing = (req,res,next)=>{
   
    let {error} = listingSchema.validate(req.body);
   
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }
    else{
        next();
    }
}
//Index route at /listings

router.get("/",wrapAsync(async (req,res,next) => {
    const allListing  = await Listing.find({});
    res.render("listings/index.ejs",{allListing});
}));

// New route for new listing
router.get("/new",(req,res)=>{
    res.render("listings/new.ejs")
})

//Create Route

router.post("/",validateListing,wrapAsync(async (req,res,next)=>{
    
    const  newListing =new Listing(req.body.listing);
    console.log(req.body.listing);
    await newListing.save();
    req.flash("success","New listing Created !");
    res.redirect("/listings");
 
    
}));

//Show route 

router.get("/:id",wrapAsync(async (req,res,next)=>{
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    if(!listing){
        req.flash("error","Listing you requested does not exixt!");
        res.redirect("/listings");
    }

    res.render("listings/show.ejs",{listing});
}));

//Get request for an edit in listing
router.get("/:id/edit",wrapAsync(async (req,res,next) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested does not exixt!");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{listing});
}));


//Update request 
router.put("/:id",validateListing,wrapAsync(async (req,res,next)=>{
    let { id } = req.params;

    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    
    req.flash("success","Your listing has been Updated !");
    res.redirect(`/listings/${id}`)
}));

//Delete route
router.delete("/:id",wrapAsync(async (req,res,next)=>{
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success","Your listing has been deleted !");
    console.log(deletedListing);
    res.redirect("/listings")
    
}));


module.exports = router;