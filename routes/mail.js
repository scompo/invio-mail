var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('mail', {
    pageName: 'mail'
  });
});

module.exports = router;
