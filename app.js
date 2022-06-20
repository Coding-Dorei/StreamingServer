const express = require('express')
const app = express()
const morgan = require('morgan')
const router = require('./router')

//middleware
app.use(morgan('dev'))
app.use('/',express.static('public'))
app.use('/',router)

app.set('PORT',80)
app.listen(app.get('PORT'),()=>{console.log(`server running on port${app.get('PORT')}`)})