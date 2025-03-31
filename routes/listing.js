const express = require("express");
const router = express.Router();

const methodOverride = require("method-override");

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Joi = require('joi');
const { listingSchema } = require("../Scema.js");
// const reviewSchema = require("./Scema.js");
const review = require("../models/review.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const ListingController = require("../Controller/listingController.js");
const Listing = require("../models/listing.js");
console.log("Listing Schema Import Check:", Listing);


const { log } = require("console");


//Index  route and Create Route at /listings using router.route

router.route("/")
.get(wrapAsync(ListingController.indexListing))
.post(isLoggedIn, validateListing, wrapAsync(ListingController.createListing));
// router.get("/", wrapAsync(ListingController.indexListing));

// New route for new listing
router.get("/new", isLoggedIn, ListingController.newRoute)

//Create Route

// router.post("/", isLoggedIn, validateListing, wrapAsync(ListingController.createListing));


//show,update,delete route compacting using router.route
router.route("/:id")
.get( wrapAsync(ListingController.showListing))
.put( isLoggedIn, isOwner, validateListing, wrapAsync(ListingController.updateListing))
.delete(isLoggedIn, isOwner, wrapAsync(ListingController.destroyListing));



//Show route 

// router.get("/:id", wrapAsync(ListingController.showListing));

//Get request for an edit in listing
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(ListingController.getEditform));


//Update request 
// router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(ListingController.updateListing));

//Delete route
// router.delete("/:id", isLoggedIn, isOwner, wrapAsync(ListingController.destroyListing));


module.exports = router;