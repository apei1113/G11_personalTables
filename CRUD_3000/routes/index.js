var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('Font', { title: 'Node.js Simple CRUD with Express.js and MySQL Tutorial' });
});

module.exports = router;
