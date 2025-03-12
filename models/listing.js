const mongoose = require("mongoose");
const review = require("./review");
const Schema = mongoose.Schema;
const Review  = require("./review.js")

const listingSchema = new Schema({
    title:{
        type: String,
        required: true, 
    } ,
    description: String,
    image: {
        filename: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            default:"https://media.istockphoto.com/id/488120139/photo/modern-real-estate.jpg?s=612x612&w=0&k=20&c=88jk1VLSoYboMmLUx173sHs_XrZ9pH21as8lC7WINQs=",
        set:(v) => v===""?"https://media.istockphoto.com/id/488120139/photo/modern-real-estate.jpg?s=612x612&w=0&k=20&c=88jk1VLSoYboMmLUx173sHs_XrZ9pH21as8lC7WINQs=":v,
            required: true,
          
          }
        
        },
    price: Number,
    location: String,
    country: String,
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }]
});


listingSchema.post("findOneAndDelete" ,async(listing)=>{
    if(listing){
         await Review.deleteMany({_id:{$in : listing.reviews}})
    }
   
})

module.exports = mongoose.model("Listing", listingSchema);