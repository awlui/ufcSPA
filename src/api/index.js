var express = require('express');
var router = express.Router();
var request = require('request');
router.get('/api/fighters', function(req, res, next) {
	var requestOptions = {
		url: 'http://ufc-data-api.ufc.com/api/v3/iphone/fighters',
		method: 'GET'
	}
	request(requestOptions, function(err, response, body) {
		if (err) {
			console.log(err)
			next();
		} else if (response.statusCode === 200) {
			res.send(body);
		} else {
			console.log(response.statusCode),
			next();
		}
	});
});
router.get('/api/fighters/:fighterID', function(req, res, next) {
	var requestOptions = {
		url: 'http://ufc-data-api.ufc.com/api/v3/iphone/fighters/' + req.params.fighterID + '.json',
		method: 'GET'
	}
	request(requestOptions, function(err, response, body) {
		if (err) {
			console.log(err)
			next();
		} else if (response.statusCode === 200) {
			res.send(body);
		} else {
			console.log(response.statusCode)
			next();
		}});
});
router.get('/api/events', function(req, res, next) {
	var requestOptions = {
		url: 'http://ufc-data-api.ufc.com/api/v3/iphone/events',
		method: 'GET'
	}
	request(requestOptions, function(err, response, body) {
		if (err) {
			console.log(err)
			next();
		} else if (response.statusCode === 200) {
			res.send(body);
		} else {
			console.log(response.statusCode),
			next();
		}
	});
});
router.get('/api/events/:eventId', function(req, res, next) {
	var requestOptions = {
		url: 'http://ufc-data-api.ufc.com/api/v3/iphone/events/' + req.params.eventId + '.json',
		method: 'GET'
	}
	request(requestOptions, function(err, response, body) {
		if (err) {
			console.log(err)
			next();
		} else if (response.statusCode === 200) {
			res.send(body);
		} else {
			console.log(response.statusCode),
			next();
		}
	});
});
router.get('/api/events/:eventId/fights', function(req, res, next) {
	var requestOptions = {
		url: 'http://ufc-data-api.ufc.com/api/v3/iphone/events/' + req.params.eventId + '/fights.json',
		method: 'GET'
	}
	request(requestOptions, function(err, response, body) {
		if (err) {
			console.log(err)
			next();
		} else if (response.statusCode === 200) {
			res.send(body);
		} else {
			console.log(response.statusCode),
			next();
		}
	});
});
router.get('/api/news', function(req, res, next) {
	var requestOptions = {
		url: 'http://ufc-data-api.ufc.com/api/v3/iphone/news.json',
		method: 'GET'
	}
	request(requestOptions, function(err, response, body) {
		if (err) {
			console.log(err)
			next();
		} else if (response.statusCode === 200) {
			res.send(body);
		} else {
			console.log(response.statusCode),
			next();
		}
	});
});
router.get('/api/media', function(req, res, next) {
	var requestOptions = {
		url: 'http://ufc-data-api.ufc.com/api/v3/iphone/media.json',
		method: 'GET'
	}
	request(requestOptions, function(err, response, body) {
		var parsedBody = JSON.parse(body);
		var currentDate = Date.now();
		var oneWeek = 86400000*7;
		var responseArr = [];
		var counter = 0, attempts = 0;
		var random;
		while (attempts < parsedBody.length && counter < 5) {
			console.log(responseArr)
			if ((new Date(parsedBody[attempts].media_date)) > (currentDate - oneWeek)) {
				responseArr.push(parsedBody[attempts]);
				counter++
			}
			attempts++;
		}

		if (err) {
			console.log(err)
			next();
		} else if (response.statusCode === 200) {
			console.log(responseArr)
			res.send(responseArr);
		} else {
			console.log(response.statusCode),
			next();
		}
	});
});
router.use(function(req,res,next) {
	res.status(404);
	res.send({
		message: "File Not Found"
	});
});

module.exports = router;