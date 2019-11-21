let express = require("express")
let bodyParser = require("body-parser")
let mongoose = require("mongoose")
let users = require("./model/users")
let episodes = require("./model/episodes")
require('isomorphic-fetch');
var fs = require("fs")
let util = require("util")
var cors = require('cors');
var app = express()

mongoose.connect("mongodb://localhost:27017/users", {useNewUrlParser: true, useUnifiedTopology: true})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());

app.get("/", async (req, res) => {
    res.send("Welcome to NeverMissAnime!")
    return
    let list = await users.find()
    await res.json(list)
})

app.post("/addepisode", async (req, res) => {
    console.log(req.body)
    let userid = req.body.userid
    let animeid = req.body.animeid
    let episodeid = req.body.episodeid
    let airingtime = req.body.airingtime
    let media = req.body.media
    
    if (!userid || !animeid || !episodeid || !airingtime || !media) {
        res.send("Invalid request")
        return
    }

    let newep = new episodes({
        userid : userid,
        animeid : animeid,
        episodeid : episodeid,
        airingtime : airingtime,
        media : media
    })

    newep = await episodes.findOneAndUpdate({userid: userid, episodeid: episodeid}, {animeid: animeid, airingtime: airingtime, media: media}, {upsert: true, new: true, setDefaultOnInsert: newep})
    res.json(newep)
    return
})

app.post("/removeepisode", async (req, res) => {
    let userid = req.body.userid
    let episodeid = req.body.episodeid
    
    if (!userid || !episodeid) {
        res.send("Invalid request")
        return
    }

    let ep = await episodes.deleteOne({userid : userid, episodeid: episodeid})
    res.json(ep)
})

app.post("/adduser", async (req, res) => {
    console.log(req.body)
    let userid = req.body.userid
    let name = req.body.name
    
    if (!userid || !name) {
        res.send("Invalid request")
        return
    }

    let newuser = new users({
        userid : userid,
        name : name
    })

    newuser = await users.findOneAndUpdate({userid: userid}, {name: name}, {upsert: true, new: true, setDefaultOnInsert: newuser})
    res.json(newuser)
    return
})

app.get("/useranimes", async (req, res) => {
    let userid = req.query.userid
    let list = await episodes.find({userid : userid})
    res.json(list)
})

app.get("/search", async (req, response) => {
    let keyword = req.query.keyword
    if (!keyword) {
        res.json(null)
        return
    }
    var query = fs.readFileSync("./model/anilistsearch.txt", "utf-8").replace("KEYWORD", keyword)
    fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query }),
    })
    .then(res => res.json())
    .then(res => {
        console.log(JSON.stringify(res.data, null, 2))
        response.json(res.data)
    });
    
})

app.get("/user", async (req, res) => {
    let id = req.query.id
    let user = await users.findOne({userid : id})
    res.json(user)
})

app.listen(8080)