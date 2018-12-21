const express = require('express')
const router = express.Router()
const personController = require('../controllers/personController')
const checkAuth = require('../middleware/check-auth')

// http://localhost:3000/api/v1/person/save
/*
Content-Type application/json
{
	"name": "Edixon",
	"lastName": "Idrogo",
	"email": "idrogo.edixon@gmail.com",
	"password": "123"
}
*/
router.route('/save').post(personController.savePerson)

// http://localhost:3000/api/v1/person/login
/*
Content-Type application/json
{
	"email": "idrogo.edixon@gmail.com",
	"password": "123"
}
*/
router.route('/login').post(personController.loginPerson)


// http://localhost:3000/api/v1/person/all
router.route('/all').get(checkAuth, personController.findAllPerson)

// http://localhost:3000/api/v1/person/:userId
router.route('/:userId').delete(checkAuth, personController.deletePerson)



module.exports = router