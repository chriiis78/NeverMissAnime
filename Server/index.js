let express = require("express")
let bodyParser = require("body-parser")
let mongoose = require("mongoose")
let users = require("./model/users")
let episodes = require("./model/episodes")
require('isomorphic-fetch');
var fs = require("fs")
let util = require("util")
var cors = require('cors');
var cron = require('cron').CronJob
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
    console.log("addepisode")
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
    console.log("useranimes " + userid)
    let list = await episodes.find({userid : userid})
    res.json(list)
})

app.get("/search", async (req, response) => {
    let keyword = req.query.keyword
    if (!keyword) {
        res.json(null)
        return
    }
    console.log("search " + keyword)
    var query = fs.readFileSync("./model/anilistsearch.txt", "utf-8").replace("KEYWORD", keyword)
    fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query }),
    })
    .then(res => res.json())
    .then(res => {
        response.json(res.data)
    });
    
})

app.get("/anime", async (req, response) => {
    let id = req.query.id
    if (!id) {
        res.json(null)
        return
    }
    console.log("anime " + id)
    var query = fs.readFileSync("./model/anilistanime.txt", "utf-8").replace("ID", id)
    fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query }),
    })
    .then(res => res.json())
    .then(res => {
        response.json(res.data)
    });
    
})

app.get("/user", async (req, res) => {
    let id = req.query.id
    let user = await users.findOne({userid : id})
    res.json(user)
})

function getAnime(id) {
    var query = fs.readFileSync("./model/anilistanime.txt", "utf-8").replace("ID", id)
    fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query }),
    })
    .then(res => res.json())
    .then(res => {
        return res.data
    }).catch((error) => {
        console.log(error)
        return null
    });
};

new cron("* * * * *", async () => {
    console.log("cron")
    let currentdate = Math.round(Date.now() / 1000)
    console.log(currentdate)
    let list = await episodes.find({airingtime: { $lte: currentdate }})
    console.log(list)

    for (i in list) {
        //notifyUser(item)
        var query = fs.readFileSync("./model/anilistanime.txt", "utf-8").replace("ID", list[i]["animeid"])
        fetch('https://graphql.anilist.co', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: query }),
        })
        .then(res => res.json())
        .then(async res => {
            res.data
            let data = res.data.Media
            if (!data || !data.nextAiringEpisode) {
                await episodes.deleteOne({userid : userid, animeid: data.id})
                return
            }

            let newep = new episodes({
                userid : list[i]["userid"],
                animeid : data.id,
                episodeid : data.nextAiringEpisode.id,
                airingtime : data.nextAiringEpisode.airingAt,
                media : data
            })
        
            newep = await episodes.findOneAndUpdate({userid: list[i]["userid"], animeid: data.id}, {episodeid: data.nextAiringEpisode.id, airingtime: data.nextAiringEpisode.airingAt, media: JSON.stringify(data)}, {upsert: true, new: true, useFindAndModify: true, setDefaultOnInsert: newep})
            console.log(newep)
            console.log("UPDATE ANIME EPISODE")
        }).catch((error) => {
            console.log(error)
        });
    }

}, null, false) // true pour activer

app.listen(8080)