const express = require("express")
const router = express.Router()
const checkAuth = require('../middleware/check-auth')
const rutasController = require('../controllers/rutasController')

//http://localhost:3000/api/v1/rutas
router.route('/').get(rutasController.findAllRutas)
/*
Content-Type	application/json
Authorization	Edixon apikey
{
	"name": "fosforos",
	"price": 10
}
*/
router.route('/').post(checkAuth, rutasController.saveRuta)
router.route('/:rutaId').get(rutasController.findRuta)
/*
Content-Type	application/json
Authorization	Edixon apikey
[
	{"propName": "name", "value": "bombillo incandecente"},
	{"propName": "price", "value": 10}
]
*/
router.route('/:rutaId').patch(checkAuth,rutasController.updateRuta)
router.route('/:rutaId').delete(checkAuth, rutasController.deleteRuta)

module.exports = router
