var expect = require('chai').expect;

var db = require('../database/database');
db.setupDbs({
  mails: undefined,
  addresses: undefined,
})

describe('database', function() {
  describe('.addresses', function() {
    describe('#save()', function() {
      it('Saves an email address with no errors', function(done) {
        db.addresses.save({
          email: "name@mail.dom"
        }, function(err, newDoc) {
          expect(newDoc).to.be.a('Object');
          expect(err).to.be.null;
          expect(newDoc.email).to.equal('name@mail.dom');
          db.addresses.deleteAll(function() {
            done();
          });
        });
      });
    });
    describe('#deleteAll()', function() {
      it('deletes all addresses', function(done) {
        db.addresses.save({
          email: "name@mail.dom"
        }, function() {
          db.addresses.deleteAll(function(err, numRemoved) {
            expect(err).to.be.null;
            expect(numRemoved).to.be.a('Number');
            done();
          });
        });
      });
    });
    describe('#all()', function(done) {
      it('Returns an array', function(done) {
        db.addresses.all(function(err, docs) {
          expect(docs).to.be.a('Array');
          done();
        });
      });
      it('Returns no error', function(done) {
        db.addresses.all(function(err, docs) {
          expect(err).to.be.null;
          done();
        });
      });
      it('Returns an empty array with no elements', function(done) {
        db.addresses.all(function(err, docs) {
          expect(docs).to.have.lengthOf(0);
          done();
        });
      });
      it('Returns the saved element after a save', function(done) {
        db.addresses.save({
          email: "name@mail.dom"
        }, function() {
          db.addresses.all(function(err, docs) {
            expect(docs).to.have.lengthOf(1);
            expect(docs[0].email).to.equal('name@mail.dom');
            db.addresses.deleteAll(function() {
              done();
            });
          });
        });
      });
    });
  });
  describe('.mails', function() {
    describe('#save()', function() {
      it('Saves an email with no errors', function(done) {
        db.mails.save({
          from: "name@mail.dom",
          subject: "test email",
          data: "blah"
        }, function(err, newDoc) {
          expect(newDoc).to.be.a('Object');
          expect(err).to.be.null;
          expect(newDoc.from).to.equal('name@mail.dom');
          expect(newDoc.subject).to.equal('test email');
          expect(newDoc.data).to.equal('blah');
          db.mails.deleteAll(function() {
            done();
          });
        });
      });
    });
    describe('#deleteAll()', function() {
      it('deletes all emails', function(done) {
        db.mails.save({
          from: "name@mail.dom",
          subject: "test email",
          data: "blah"
        }, function() {
          db.mails.deleteAll(function(err, numRemoved) {
            expect(err).to.be.null;
            expect(numRemoved).to.be.a('Number');
            db.mails.all(function(err, docs) {
              expect(docs).to.have.lengthOf(0);
              done();
            });
          });
        })
      });
    });
    describe('#bySubject()', function() {
      it('returns the correct email by subject', function(done) {
        db.mails.save({
          from: "name@mail.dom",
          subject: "test email",
          data: "blah"
        }, function() {
          db.mails.bySubject("test email", function(err, doc) {
            expect(err).to.be.null;
            expect(doc.subject).to.equal('test email');
            db.mails.deleteAll(function() {
              done();
            });
          });
        });
      });
      it('does not find a non existing mail', function(done) {
        db.mails.save({
          from: "name@mail.dom",
          subject: "test email",
          data: "blah"
        }, function() {
          db.mails.bySubject("not existing", function(err, doc) {
            expect(err).to.be.null;
            expect(doc).to.be.null;
            db.mails.deleteAll(function() {
              done();
            });
          });
        });
      });
    });
    describe('#all()', function() {
      it('Returns an array', function(done) {
        db.mails.all(function(err, docs) {
          expect(docs).to.be.a('Array');
          done();
        });
      });
      it('Returns no error', function(done) {
        db.mails.all(function(err, docs) {
          expect(err).to.be.null;
          done();
        });
      });
      it('Returns an empty array with no elements', function(done) {
        db.mails.all(function(err, docs) {
          expect(docs).to.have.lengthOf(0);
          done();
        });
      });
      it('Returns the saved element after a save', function(done) {
        db.mails.save({
          from: "name@mail.dom",
          subject: "test email",
          data: "blah"
        }, function() {
          db.mails.all(function(err, docs) {
            expect(docs).to.have.lengthOf(1);
            expect(docs[0].from).to.equal('name@mail.dom');
            expect(docs[0].subject).to.equal('test email');
            expect(docs[0].data).to.equal('blah');
            db.mails.deleteAll(function() {
              done();
            });
          });
        });
      });
    });
  });
});
