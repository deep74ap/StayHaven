const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
});

module.exports = mongoose.model("Listing", listingSchema);