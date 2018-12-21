const express = require("express")
const router = express.Router()
const checkAuth = require('../middleware/check-auth')
const productsController = require('../controllers/productsController')

//http://localhost:3000/api/v1/products
router.route('/').get(productsController.findAllProducts)
/*
Content-Type	application/json
Authorization	Edixon apikey
{
	"name": "fosforos",
	"price": 10
}
*/
router.route('/').post(checkAuth, productsController.saveProduct)
router.route('/:productId').get(productsController.findProduct)
/*
Content-Type	application/json
Authorization	Edixon apikey
[
	{"propName": "name", "value": "bombillo incandecente"},
	{"propName": "price", "value": 10}
]
*/
router.route('/:productId').patch(checkAuth,productsController.updateProduct)
router.route('/:productId').delete(checkAuth, productsController.deleteProduct)

module.exports = router
