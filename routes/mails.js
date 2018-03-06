var express = require('express');
var router = express.Router();
var db = require('../database/database');
var multer = require('multer');
var upload = multer();

router.get('/', function(req, res, next) {
  db.mails.all(function(err, ms) {
    res.render('mails/all', {
      pageName: 'mails',
      mails: ms
    });
  });
});

router.get('/new', function(req, res, next) {
  db.mails.all(function(err, ms) {
    res.render('mails/new', {
      backPage: 'mails',
      pageName: 'new',
    });
  });
});

router.get('/details', function(req, res, next) {
  db.mails.bySubject(req.query.subject, function(err, m) {
    res.render('mails/details', {
      backPage: 'mails',
      pageName: 'details',
      mail: m
    });
  });
});

router.get('/delete', function(req, res, next) {
  db.mails.delete(req.query.subject, function(err, m) {
    res.redirect('/mails');
  });
});

var d1 = upload.fields([{
  name: 'user_attachment',
  maxCount: 8
}])
router.post('/update', d1, function(req, res, next) {
  var userEmail = {
    from: req.body['user_from'],
    subject: req.body['user_subject'],
    text: req.body['user_text'],
    attachment: req.files['user_attachment']
  }
  db.mails.update(userEmail, function(err, numAffected, affectedDocuments, upsert) {
    res.redirect('/mails');
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
