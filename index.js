const express = require('express')
const app = express()
const  routes = require('./controllers/users')
const conn = require('./controllers/db')

app.use(express.json())
app.use("/users", routes)

app.listen(4000)