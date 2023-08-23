const http = require("http")



const PORT = 3000
const HOSTNAME = 'localhost'

const {reqHandle} = require('./rout')

const server = http.createServer(reqHandle)


server.listen(PORT, HOSTNAME, ()=>{
    console.log(`SERVER RUNNING ON http://${HOSTNAME}:${PORT}`);
})





