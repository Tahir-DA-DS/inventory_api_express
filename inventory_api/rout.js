const express = require("express")
const router = express.Router()

const itemController = require('./controller')



router.get('/', itemController.getItems)

router.get('/:id', itemController.getOne)

router.post('/', itemController.createItem)

router.patch('/:id', itemController.updateItem)

router.delete('/:id', itemController.deleteItem)

module.exports = router