var express = require('express');
var router = express.Router();
var db = require('../data/database');
var multer = require('multer');
var upload = multer();

/* GET home page. */
router.get('/', function(req, res, next) {
  var mails = db.mails.where(function(obj) {
    return true;
  });
  res.render('mails', {
    pageName: 'mails',
    mails: mails
  });
});

var d = upload.fields([{
  name: 'user_attachment',
  maxCount: 8
}])
router.post('/', d, function(req, res, next) {
  var userEmail = {
    subject: req.body['user_subject'],
    text: req.body['user_text'],
    attachment: req.files['user_attachment']
  }
  db.mails.insert(userEmail);
  res.redirect('/mails');
});

module.exports = router;
