const express = require('express')
const app = express()
const  routes = require('./controllers/routes')
const conn = require('./controllers/db')

app.use(express.json())
app.use("/", routes)

app.listen(4000)