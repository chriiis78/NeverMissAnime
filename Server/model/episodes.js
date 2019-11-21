let mongoose = require("mongoose")

let schema = mongoose.Schema({
    userid : String,
    animeid : Number,
    episodeid : { type: Number, unique: true },
    airingtime : Number,
    media : JSON
})

module.exports = mongoose.model("episodes", schema)