'use strict';

const
	express = require('express'),
	router = express.Router();

router
	.get('/datos', (req, res, next) => {
		res.render('json');
	});