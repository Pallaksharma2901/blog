const mongoose = require("mongoose");

const db = async()=>{
    await mongoose.connect('mongodb+srv://pallakmanojsharma:pallak29@cluster0.nxsqblh.mongodb.net/Blog');
    console.log("Database is connected");
}

module.exports = db;