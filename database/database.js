const Datastore = require('nedb');

db = {}

function setupDbs(conf) {
  console.log(conf);
  db.mails = new Datastore(conf.mails);
  db.addresses = new Datastore(conf.addresses);

  db.addresses.loadDatabase(function(err) {
    if (err) {
      console.error(err);
    }
  });
  db.mails.loadDatabase(function(err) {
    if (err) {
      console.error(err);
    }
  });
}

function allMails(callback) {
  db.mails.find({}, callback);
}

function saveMail(mail, callback) {
  db.mails.insert(mail, callback);
}

function emailBySubject(s, callback) {
  db.mails.findOne({
    subject: s
  }, callback);
}

function deleteAllEmails(callback) {
  db.mails.remove({}, {
    multi: true
  }, callback);
}

function allAddresses(callback) {
  db.addresses.find({}, callback);
}

function saveAddress(addr, callback) {
  db.addresses.insert(addr, callback);
}

function deleteAllAddresses(callback) {
  db.addresses.remove({}, {
    multi: true
  }, callback);
}

module.exports = {
  setupDbs: setupDbs,
  addresses: {
    all: allAddresses,
    save: saveAddress,
    deleteAll: deleteAllAddresses
  },
  mails: {
    all: allMails,
    save: saveMail,
    bySubject: emailBySubject,
    deleteAll: deleteAllEmails
  }
};
