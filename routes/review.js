const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Joi = require('joi');
const { reviewSchema} = require("../Scema.js"); 
const review = require("../models/review.js"); 

const Listing = require("../models/listing.js"); 
const {validateReview, isLoggedIn,isReviewAuthor} = require("../middleware.js")
const reviewController = require("../Controller/reviewController.js")

//review route   for post
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.postReview));


// Review delete route

router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview))


module.exports = router;