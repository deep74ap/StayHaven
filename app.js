const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMAte = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const Joi = require('joi');
const {listingSchema}= require("./Scema.js")

const Listing = require("./models/listing.js"); 
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMAte);
app.use(express.static(path.join(__dirname,"/public")));

port = 8080;


main().then(()=>{console.log("Dbs created");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/ProjectDbs');
}

const validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,error);
    }
    else{
        next();
    }
}

app.get("/",(req,res) =>{
    res.send("Hii I am response");
});

// app.get("/testing",async (req,res)=>{
//     let newlisting = new Listing({
//         title : "A apartment",
//         description: " A well looking apartment with seaview",
//         price:12000,
//         location:"Mumbai",
//         country:"India",
//     });
//     //
    
//     res.send("Saved")
//     // console.log(newlisting);
    
// })

//Index route at /listings

app.get("/listings",wrapAsync(async (req,res,next) => {
    const allListing  = await Listing.find({});
    res.render("listings/index.ejs",{allListing});
}));

// New route for new listing

app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs")
})

//Create Route

app.post("/listings",validateListing,wrapAsync(async (req,res,next)=>{
    
    const  newListing =new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
 
    
}));

//Show route 

app.get("/listings/:id",wrapAsync(async (req,res,next)=>{
    let { id } = req.params;
    const listing = await Listing.findById(id);

    res.render("listings/show.ejs",{listing});
}));

//Get request for an edit in listing
app.get("/listings/:id/edit",wrapAsync(async (req,res,next) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
}));


//Update request 
app.put("/listings/:id",validateListing,wrapAsync(async (req,res,next)=>{
    let { id } = req.params;

    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`)
}));

//Delete route
app.delete("/listings/:id",wrapAsync(async (req,res,next)=>{
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings")
    
}));
app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not found"))
});

app.use((err,req,res,next) =>{
    let {status = 500,message = "Something went error"} = err;

    // res.status(status).send(message);
    res.status(status=500).render("error.ejs",{err});
})

app.listen(port,()=>{
    console.log("SErver is listening on port 8080")
});
