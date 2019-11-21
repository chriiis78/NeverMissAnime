let mongoose = require("mongoose")

let schema = mongoose.Schema({
    userid : { type: String, unique: true },
    name : String
})

module.exports = mongoose.model("users", schema)