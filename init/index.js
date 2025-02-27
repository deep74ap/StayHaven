const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js"); 


main().then(()=>{console.log("Dbs created");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/ProjectDbs');
};
const initDB = async ()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initdata.data);
    console.log("Data is initialised");
}
initDB();