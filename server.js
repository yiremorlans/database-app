//REQUIRE DEPENDENCIES
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 3000
require('dotenv').config()
//DECLARE DB VARIABLES
let db, dbConnectionStr = process.env.DB_STRING,
    dbName = 'superdevs'
//CONNECT TO MONGO
MongoClient.connect(dbConnectionStr) 
    .then(client => {
        console.log(`Connected to ${dbName} database.`)
        db = client.db(dbName)
    })
//SET MIDDLEWARE
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
//CRUD METHODS
app.get('/', (req, res) => {
    db.collection('superdevs').find().toArray()
        .then(data => {
            let nameList = data.map(item => item.heroName)
            res.render('index.ejs', {info: nameList})
        })
        .catch(error => console.error(error))  
})

app.post('/api', (req, res) => {
    db.collection('superdevs').insertOne(
        req.body
    )
    .then(result => {
        console.log(result)
        res.redirect('/')
    })
})

app.put('/updateEntry', (req, res) => {
    console.log(req.body)
    Object.keys(req.body).forEach(key => {
        if (req.body[key] === null || req.body[key] === undefined || req.body[key] === '') {
            delete req.body[key]
        }
    }) 
    console.log(req.body)
    db.collection('superdevs').findOneAndUpdate(
        {name: req.body.name},
        {
            $set: req.body
        }
    )
    .then(result => {
        console.log(result)
        res.json('Success')
    })
    .catch(err => console.log(err))
})  

app.delete('/deleteEntry', (req, res) => {
    db.collection('superdevs').deleteOne(
        {name: req.body.name}
    )
    .then(result => {
        console.log('Entry Deleted')
        res.json('Entry Deleted')
    })
    .catch(err => console.log(err))
})

//SET UP LOCALHOST ON PORT
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
})