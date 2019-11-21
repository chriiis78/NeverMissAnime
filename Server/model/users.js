let mongoose = require("mongoose")

let schema = mongoose.Schema({
    userid : String,
    name : String
})

module.exports = mongoose.model("users", schema)