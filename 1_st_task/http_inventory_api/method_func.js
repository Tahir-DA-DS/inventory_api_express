const path = require('path')
const fs = require("fs")
const datab = path.join(__dirname, 'db', 'data.json')


//creating items
const createItem=(req, res)=>{

    const itemBody = []
    req.on('data', (chunk)=>{
        itemBody.push(chunk)
    })

    req.on("end", ()=>{
        dataCreate = Buffer.concat(itemBody).toString()
        parsedItem = JSON.parse(dataCreate)

        fs.readFile(datab, 'utf8', (err, data)=>{
            if(err){
                console.log(err);
                res.end('An error occured')
            }
    
            const oldItem = JSON.parse(data)
            const allItem = [...oldItem, parsedItem]
    
        fs.writeFile(datab, JSON.stringify(allItem), 'utf8', (err)=>{
            if (err) {
                console.log(err);
                res.writeHead(500)
                res.end(`Internal error occured`)
            }
            res.end(JSON.stringify(parsedItem))
        })
        })
    })


}

//get all items
const getAll =(req, res)=>{
    fs.readFile(datab, 'utf8', (err, data)=>{
        if(err){
            console.log(err);
            res.writeHead(400);
            res.end("An error occured")
        }

        const dataResult = JSON.stringify(data)
        const parsedResult = JSON.parse(dataResult)
        res.writeHead(200)
        res.end(parsedResult)
    })
}


//get a single item
const getOne=(req, res)=>{
    const urlSplit = req.url.split('/') 
    const urlId = parseInt(urlSplit[2]);

    if (isNaN(urlId)) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid item ID');
      }

      fs.readFile(datab, 'utf8', (err, data)=>{
        if(err){
            console.log(err);
            res.writeHead(500)
            res.end("Internal error reading file")
        }

        const result = JSON.parse(data)
        const resultItemIndex = result.findIndex(item=>item.id==urlId)
        if (resultItemIndex == -1) {
            res.writeHead(404)
            res.end(`Item Not found`)
            return
        }
      
        res.writeHead(200)
        res.end(JSON.stringify(result[resultItemIndex]))
    
        
        
    })

}


//update item
const update=(req, res)=>{
    const body = []
    req.on("data", (chunk)=>{
        body.push(chunk)
    })

    req.on("end", ()=>{
        const itemProp = Buffer.concat(body).toString()
        const parsedProp = JSON.parse(itemProp)
        const unitId = parsedProp.id
        
        fs.readFile(datab, 'utf8', (err, data)=>{
            if(err){
                console.log(err);
            }
            const itemObj = JSON.parse(data)

            const itemIndex = itemObj.findIndex(item=>unitId==item.id)
            if(itemIndex==-1){
                res.writeHead(404)
                res.end(`item not found`)
            }

            const updatedItem = {...itemObj[itemIndex], ...parsedProp}
            itemObj[itemIndex]=updatedItem

            fs.writeFile(datab, JSON.stringify(itemObj), (err)=>{
                if(err){
                    res.writeHead(500)
                    res.end(`could not save to the database`)
                }
                res.writeHead(200)
                res.end(`upadated successfully`)
            })
        })
    })
}


//delete an item
const deleteItem=(req, res)=>{
    const body =[]
    req.on('data', (chunk)=>{
        body.push(chunk)

    })

    req.on("end", ()=>{
        const allBody = Buffer.concat(body).toString()
        const parseAll = JSON.parse(allBody)
        const bodyid = parseAll.id

        fs.readFile(datab, 'utf8', (err, data)=>{
            if(err){
                console.log(err);
                res.writeHead(500)
                res.end(`Internal Error Could not read file`)
            }
    
            const dataRead = JSON.parse(data)
    
            const dataIndex = dataRead.findIndex(item=>item.id==bodyid)

            if(dataIndex == -1){
                res.writeHead(404)
                res.end(`item not found`)
            }

            dataRead.splice(dataIndex, 1)

            fs.writeFile(datab, JSON.stringify(dataRead), (err)=>{
                if (err) {
                    console.log(err);
                    res.writeHead(500)
                    res.end(`could not save file to the database`)
                }

                res.writeHead(200)
                res.end(`Item deleted successfully`)
            })
        })
    })

}

module.exports ={getAll, createItem, getOne, update, deleteItem}