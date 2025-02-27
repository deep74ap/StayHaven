const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");

const Listing = require("./models/listing.js"); 
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

port = 8080;


main().then(()=>{console.log("Dbs created");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/ProjectDbs');
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

app.get("/listings",async (req,res) => {
    const allListing  = await Listing.find({});
    res.render("listings/index.ejs",{allListing});
});

// New route for new listing

app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs")
})

//Create Route

app.post("/listings",async (req,res)=>{
    const  newListing =new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
 
    
})

//Show route 

app.get("/listings/:id",async (req,res)=>{
    let { id } = req.params;
    const listing = await Listing.findById(id);

    res.render("listings/show.ejs",{listing});
})

//Get request for an edit in listing
app.get("/listings/:id/edit",async (req,res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
})


//Update request 
app.put("/listings/:id",async (req,res) =>{
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`)
})

//Delete route
app.delete("/listings/:id",async (req,res)=>{
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings")
    
})

app.listen(port,()=>{
    console.log("SErver is listening on port 8080")
});
