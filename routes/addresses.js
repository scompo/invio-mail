var express = require('express');
var router = express.Router();
var db = require('../database/database');
var multer = require('multer');
var upload = multer();

/* GET home page. */
router.get('/', function(req, res, next) {
  db.addresses.all(function(err, adds) {
    res.render('addresses/addresses', {
      pageName: 'addresses',
      addresses: adds
    });
  });
});

router.post("/", upload.array(), function(req, res, next) {
  var addr = {
    email: req.body['user_addr']
  }
  db.addresses.save(addr);
  res.redirect('/addresses');
});

module.exports = router;
