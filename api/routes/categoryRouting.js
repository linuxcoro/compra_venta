const express = require("express")
const router = express.Router()
const categoryController = require('../controllers/categoryController')

//http://localhost:3000/api/v1/category
router.route('/').get(categoryController.findAllRutas)

module.exports = router
