let mongoose = require("mongoose")

let schema = mongoose.Schema({
    userid : String,
    name : String,
    pushtoken : String
})

module.exports = mongoose.model("users", schema)