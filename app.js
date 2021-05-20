const path = require('path')
const express = require('express')
const exphbs  = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')


const app = express()
const port = 3003
const hostname = '127.0.0.1'

// mongoose.connect(`mongodb://${hostname}/materia-trial`, {
mongoose.connect(`mongodb+srv://admin42:materia42@materia-trial-l2a9r.mongodb.net/materia-test?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true 
}, () => {
    console.log("Successfully connected to MongoDB !")
})

app.use(fileUpload())

app.use(express.static('public'))

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


const main = require('./routes/main')
app.use('/', main)

app.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port} !`)
    
})