const Listing = require("../models/listing.js");


//Index route controller
module.exports.indexListing = async (req, res, next) => {
    const allListing = await Listing.find({});
    res.render("listings/index.ejs", { allListing });
};

//New route
module.exports.newRoute = (req, res) => {
    res.render("listings/new.ejs")
}

//Create route
module.exports.createListing = async (req, res, next) => {

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    console.log(req.body.listing);
    await newListing.save();
    req.flash("success", "New listing Created !");
    res.redirect("/listings");


};

//Show Route
module.exports.showListing = async (req, res, next) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({
        path: "reviews",
         populate: {
            path: "author"
        }
    }).populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested does not exixt!");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
};

//Get an edit request
module.exports.getEditform = async (req, res, next) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested does not exixt!");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
};

//Update request
module.exports.updateListing = async (req, res, next) => {
    let { id } = req.params;

    await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    req.flash("success", "Your listing has been Updated !");
    res.redirect(`/listings/${id}`)
};

//Delete Listing
module.exports.destroyListing = async (req, res, next) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Your listing has been deleted !");
    console.log(deletedListing);
    res.redirect("/listings")

};