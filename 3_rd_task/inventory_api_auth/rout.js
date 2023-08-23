const express = require("express")
const router = express.Router()

const itemController = require('./controller')
const {authenticate} = require('./authenticate')
const {roleAcess} = require('./accessControl')



router.get('/', authenticate, roleAcess('user'), itemController.getItems)

router.get('/:id', authenticate, roleAcess('user'), itemController.getOne)

router.post('/', authenticate, roleAcess('admin'), itemController.createItem)
 
router.post('/user', itemController.createUser)

router.patch('/:id', authenticate, roleAcess('admin'), itemController.updateItem)

router.delete('/:id', authenticate, roleAcess('admin'),  itemController.deleteItem)

module.exports = router