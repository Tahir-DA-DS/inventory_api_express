const http = require("http")
const fs = require("fs")
const path = require("path")

const HOSTNAME = 'localhost'
const PORT = 3000
const studentPagepath = path.join(__dirname, 'pages', 'index.html')
const errPagepath = path.join(__dirname, 'pages', '404page.html')

const server = http.createServer(reqHandle)

server.listen(PORT, HOSTNAME, ()=>{
    console.log('server running');
})

function reqHandle(req, res){
    if(req.url==='/index.html' && req.method==='GET'){
    fs.readFile(studentPagepath, 'utf8', (err, data)=>{
        if(err){
            console.log(err);
            res.writeHead(500, { 'Content-Type': 'text/html'} )
        }
        res.writeHead(200);
        res.end(data);
    })


}
    else{
        fs.readFile(errPagepath, 'utf8', (err, page)=>{
            if(err){
                console.log(err);
            }

            res.writeHead(404, { 'Content-Type': 'text/html'} )
            res.end(page)
        })
    }


}

