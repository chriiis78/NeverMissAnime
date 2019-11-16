let express = require("express")
let bodyParser = require("body-parser")
let mongoose = require("mongoose")
let users = require("./model/users")
require('isomorphic-fetch');
var fs = require("fs")
let util = require("util")

var app = express()

mongoose.connect("mongodb://localhost:27017/users", {useNewUrlParser: true, useUnifiedTopology: true})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post("/addepisode", async (req, res) => {
    console.log(req.body)
    let userid = req.body.userid
    let animeid = req.body.animeid
    let episodeid = req.body.episodeid
    let airingtime = req.body.airingtime
    
    if (!userid || !name) {
        res.send("Invalid request")
        return
    }

    let newuser = new users({
        userid : userid,
        name : name
    })

    await newuser.save()
    res.json(newuser)
    return
})

app.get("/", async (req, res) => {
    let list = await users.find()
    await res.json(list)
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

app.get("/user/:id", async (req, res) => {
    let id = req.params.id
    let user = await users.findOne({userid : id})
    res.json(user)
})




app.listen(8080)