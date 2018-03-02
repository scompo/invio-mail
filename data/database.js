const loki = require('lokijs');
var db = new loki('invio-mail.db', {
  autosave: false
});
console.log(db);
var a = db.addCollection('children');
var m = db.addCollection('mail');

// a.insert({
//   email: 'prova@prova.it',
//   consorzio: 'blabla'
// })
// a.insert({
//   email: 'prova2@prova.it',
//   consorzio: 'blabla'
// })

var database = {
  mail: m,
  addresses: a
}

module.exports = database;
