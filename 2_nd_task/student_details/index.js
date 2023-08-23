const express = require("express")
const path = require("path")

const app = express()

const PORT = 3000

const studentPage = path.join(__dirname, 'pages', 'index.html')
const Errpage = path.join(__dirname, 'pages', '404page.html')

app.use('/index.html',  express.static(studentPage))

app.use('/*', express.static(Errpage))



app.listen(PORT, 'localhost', ()=>{
    console.log(`server is running on ${PORT}`);
})