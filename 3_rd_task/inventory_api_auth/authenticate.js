const dotenv = require('dotenv')
dotenv.config({path:'../.env'})

const TOKEN = process.env.API_KEY

const authenticate = (req, res, next)=>{
    new Promise((resolve, reject) => {
        let token = req.headers.authorization

        console.log(token) // Bearer 12jdjkshmt3
                        //      0       1

        if(!token){
            res.send(`please enter a token it is needed`)
            reject(`empty token not allowed`)
            
        }
        token = token.split(" ")[1]

        if(token !== TOKEN){
            res.send(`enter the correct token to gain access`)
            reject(`YOU ARE NOT AUTHORISED`)
            
        }

        resolve()
    })

    next()
}



module.exports = {
    authenticate
}

