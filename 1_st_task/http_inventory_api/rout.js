const {getAll, createItem, getOne, update, deleteItem} = require('./method_func')


function reqHandle(req, res){
    if(req.url=='/items' && req.method == "POST"){
        createItem(req, res);
    }

    else if(req.url=='/items' && req.method == "GET"){
        getAll(req, res)
    }
    
    else if (req.method === 'GET' && req.url.startsWith('/items/')){
        getOne(req, res)

    }
    
    else if(req.url=='/items' && req.method == "PUT"){
        update(req, res)
    }

    else if(req.url=='/items' && req.method == "DELETE"){
        deleteItem(req, res);
    }

    else{
        res.writeHead(404)
        res.end('page not found')
    }
}

module.exports = {reqHandle}