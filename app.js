const express = require('express')
const app = express()
const morgan = require('morgan')
const router = require('./router')

//middleware
app.use(morgan('dev'))
app.use('/',express.static('public'))
app.use('/',router)

app.set('PORT',8080)
app.listen(app.get('PORT'))