const path =require("path")
const fs =require("fs")
const userDb = path.join(__dirname, 'db', 'users.json')

//admin , user

const roleAcess = (role)=>{
            return (req, res, next)=>{
            fs.readFile(userDb, 'utf8', (error, data)=>{
                if (error) {
                    return error
                }
                let users = JSON.parse(data);
            
                const accessreq = req.body
        
                const user = users.find(user=>user.username == accessreq.username)
        
                if (!user) {
                    res.send(`please enter a valid username it is needed`)
                    return
                }
            
                if(role==user.role){

                    next()
                }

                else{
                    res.send(`you dont have required accesss to this resource`)
                }
                
            })
            

        }
   
}

module.exports ={
    roleAcess
}