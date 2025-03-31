const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js"); 

//Initialising the database
main().then(()=>{console.log("Dbs created");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/ProjectDbs');
};
const initDB = async ()=>{
    await Listing.deleteMany({});
    //Adding owner to all listing , same owner
    initdata.data =  initdata.data.map((obj)=>({
      ...obj,owner : "67e9be73d5a5950548003d5b"
    }));
    await Listing.insertMany(initdata.data);
    console.log("Data is initialised");
}
initDB();