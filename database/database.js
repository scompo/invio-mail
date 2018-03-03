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
  return db.mails.find({}, callback);
}

function saveMail(mail, callback) {
  db.mails.insert(mail, callback);
}

function allAddresses(callback) {
  return db.addresses.find({}, callback);
}

function saveAddress(addr, callback) {
  db.addresses.insert(addr, callback);
}

module.exports = {
  setupDbs: setupDbs,
  addresses: {
    all: allAddresses,
    save: saveAddress
  },
  mails: {
    all: allMails,
    save: saveMail
  }
};
