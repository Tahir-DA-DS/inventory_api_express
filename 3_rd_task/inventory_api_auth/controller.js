const fs = require('fs')
const path = require("path")


const databs = path.join(__dirname, 'db', 'data.json')

const userDb = path.join(__dirname, 'db', 'users.json')

const createItem =(req, res)=>{

    fs.readFile(databs, 'utf8', (err, data)=>{
        if (err) {
            return err
        }
        
        const itemsData = JSON.parse(data)
        
        const newItem = req.body

        console.log(newItem);
    
        const item_addid ={

            ...newItem,
        
            id:itemsData.length + 1
        }

       itemsData.push(item_addid)

       console.log(itemsData)
       allData = JSON.stringify(itemsData)

        fs.writeFile(databs, allData, (err)=>{
            if(err){
                res.status(500).send('Internal Error Occured')
            }

            res.status(201).send('Item created successfully')

        })
       
    })
}

//get all items
const getItems =(req, res)=>{
    
    fs.readFile(databs, 'utf8', (err, data)=>{
        if (err) {
            return err
        }
        res.send(JSON.parse(data))

        
    })
}

//get one item

const getOne = (req, res)=>{

    const itemId = parseInt(req.params.id)

    fs.readFile(databs, 'utf8', (err, data)=>{
        if (err) {
            return err
        }

        const items = JSON.parse(data)

        const item = items.find(item=>item.id === itemId)

        if(item){
            res.send(item)
        }

        else{
            res.status(404).send(`Item with id:${itemId} does not exist`)
        }

    
})
}

//update-item

const updateItem = (req, res)=>{

    const itemId = parseInt(req.params.id)

    const updatedItem = req.body


    fs.readFile(databs, 'utf8', (err, data)=>{
        if (err) {
            return err
        }

        const items = JSON.parse(data)

        let itemIndex = items.findIndex(item=>item.id === itemId)

        if(itemIndex == -1){
            return res.status(404).json({ message: 'Item not found' })
           
        }
        
        items[itemIndex] = {...items[itemIndex], ...updatedItem}


        fs.writeFile(databs, JSON.stringify(items), (err)=>{
            if(err){
                res.status(500).send('Internal Error Occured')
            }

            res.status(201).send('Item updated successfully')

        })

    })

}

//delete an item

const deleteItem=(req, res)=>{

    const itemId = parseInt(req.params.id)

    fs.readFile(databs, 'utf8', (err, data)=>{
        if (err) {
            return err
        }

        const items = JSON.parse(data)

        let itemIndex = items.findIndex(item=>item.id === itemId)

        if(itemIndex == -1){
            return res.status(404).json({ message: 'Item not found' })
           
        }
        
       else{
        items.splice(itemIndex, 1)
       }


        fs.writeFile(databs, JSON.stringify(items), (err)=>{
            if(err){
                res.status(500).send('Internal Error Occured')
            }

            res.status(201).send(`Item with id: ${itemId} was deleted successfully`)

        })

    })



}

//create_user
const userroles = ['admin', 'readers']
const indexRand = Math.floor(Math.random()*userroles.length)
    
const createUser=(req, res)=>{
    fs.readFile(userDb, 'utf8', (error, data)=>{
        if (error) {
            return error
        }
        let users = JSON.parse(data);

        const userData = req.body

        const newUser = {
            username:userData.username,
            email:userData.email,
            role:`${userroles[indexRand]}`,
            id:`${parseInt(users.length + 1)}`
        }

        const checkUser = users.find(user=>user.username == newUser.username)

        if(checkUser){
            res.send(`user with username:${newUser.username} exist already`)
            return
        }

        users.push(newUser)
        res.send('user registered successfully')
        
        fs.writeFile(userDb, JSON.stringify(users), (err)=>{
            if(err){
            res.status(500)
            return
            }
        })

        res.status(201)
        console.log((`user with username: ${newUser.email} has been added successfully`))

    })

}


module.exports ={
    getItems,
    getOne,
    createItem,
    updateItem,
    deleteItem, 
    createUser
}