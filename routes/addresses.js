var express = require('express');
var router = express.Router();
var db = require('../data/database');
var multer = require('multer');
var upload = multer();

/* GET home page. */
router.get('/', function(req, res, next) {
  addresses = db.addresses.where(function(obj) {
    return true;
  });
  res.render('addresses', {
    pageName: 'addresses',
    addresses: addresses
  });
});

router.post("/", upload.array(), function(req, res, next) {
  var addr = {
    email: req.body['user_addr']
  }
  console.log(addr);
  db.addresses.insert(addr);
  res.redirect('/addresses');
});

module.exports = router;
