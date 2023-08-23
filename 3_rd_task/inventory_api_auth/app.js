const express = require('express')
const app = express()

const itemRouts=require('./rout.js')

app.use(express.json())
app.use('/items', itemRouts)






app.listen(3000, ()=>{

})


