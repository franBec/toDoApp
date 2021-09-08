require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//database connection
const mongoose = require('mongoose')
const uri=`○mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.z7ncs.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`
const connectConfigObject = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(uri,connectConfigObject)
.then(()=>console.log("Connected to database!"))
.catch(e => console.log(e))

//template engine, probably replaced by react
app.set('view engine', 'ejs')
app.set('views', __dirname+'/views')

//static route, not sure what is doing ¿?
app.use(express.static(__dirname+"/public"))

//middleware: routing to pages
app.use('/', require('./routing/routingPaths'))
app.use('/tasks', require('./routing/tasksApi'))

//middleware: 404 response
app.use((req, res, next)=>{
    res.status(404).render("404", {})
})


//host connection
const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{
    console.log("Server is working at: ", PORT)
})