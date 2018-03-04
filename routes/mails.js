var express = require('express');
var router = express.Router();
var db = require('../database/database');
var multer = require('multer');
var upload = multer();

/* GET home page. */
router.get('/', function(req, res, next) {
  db.mails.all(function(err, ms) {
    res.render('mails/mails', {
      pageName: 'mails',
      mails: ms
    });
  });
});

router.get('/details', function(req, res, next) {
  console.log(req.query.subject);
  db.mails.bySubject(req.query.subject, function(err, m) {
    res.render('mails/details', {
      pageName: 'mail details',
      mail: m
    });
  });
});

var d = upload.fields([{
  name: 'user_attachment',
  maxCount: 8
}])
router.post('/', d, function(req, res, next) {
  var userEmail = {
    from: req.body['user_from'],
    subject: req.body['user_subject'],
    text: req.body['user_text'],
    attachment: req.files['user_attachment']
  }
  db.mails.save(userEmail);
  res.redirect('/mails');
});

module.exports = router;
