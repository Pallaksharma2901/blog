const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
})

const userDb = mongoose.model("userTbl", userSchema)

module.exports = userDb