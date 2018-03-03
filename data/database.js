const loki = require('lokijs');

var db = new loki('invio-mail.db', {
  autosave: true
});

var a = db.addCollection('children');
var m = db.addCollection('mails');

var database = {
  mails: m,
  addresses: a
}

module.exports = database;
