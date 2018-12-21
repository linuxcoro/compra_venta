const express = require("express")
const router = express.Router()
const scrapingController = require('../controllers/scrapingController')

//http://localhost:3000/api/v1/scraping
router.route('/').get(scrapingController.findAllRutas)

module.exports = router
