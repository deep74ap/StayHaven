

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMAte = require("ejs-mate");
// const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
// const Joi = require('joi');
// const {listingSchema , reviewSchema} = require("./Scema.js"); 
// const reviewSchema = require("./Scema.js");
// const review = require("./models/review.js"); 
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js")


// const Listing = require("./models/listing.js"); 
const { log } = require("console");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(express.json()); 
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


app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);



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



app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not found"))
});

app.use((err,req,res,next) =>{
    let {status = 500,message = "Something went error"} = err;
    console.log(err);
    // res.status(status).send(message);
    res.status(status).render("error.ejs",{err});
})

app.listen(port,()=>{
    console.log("SErver is listening on port 8080")
});
