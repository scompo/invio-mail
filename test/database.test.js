var expect = require('chai').expect;

var db = require('../database/database');
db.setupDbs({
  mails: undefined,
  addresses: undefined,
})

describe('database', function() {
  describe('.addresses', function() {
    describe('#save()', function() {
      it('Saves an email address with no errors', function() {
        db.addresses.save({
          email: "name@mail.dom"
        }, function(err, newDoc) {
          expect(newDoc).to.be.a('Object');
          expect(err).to.be.undefined;
          expect(newDoc.email).to.equal('name@mail.dom');
        });
      });
    });
    describe('#allEmail()', function() {
      it('Returns an array', function() {
        db.addresses.all(function(err, docs) {
          expect(docs).to.be.a('Array');
        });
      });
      it('Returns no error', function() {
        db.addresses.all(function(err, docs) {
          expect(err).to.be.undefined;
        });
      });
      it('Returns an empty array with no elements', function() {
        db.addresses.all(function(err, docs) {
          expect(docs).to.have.lengthOf(0);
        });
      });
      it('Returns the saved element after a save', function() {
        db.addresses.save({
          email: "name@mail.dom"
        });
        db.addresses.all(function(err, docs) {
          expect(docs).to.have.lengthOf(1);
          expect(docs[0].email).to.equal('name@mail.dom')
        });
      });
    });
  });
  describe('.mails', function() {
    describe('#save()', function() {
      it('Saves an email with no errors', function() {
        db.mails.save({
          from: "name@mail.dom",
          subject: "test email",
          data: "blah"
        }, function(err, newDoc) {
          expect(newDoc).to.be.a('Object');
          expect(err).to.be.undefined;
          expect(newDoc.from).to.equal('name@mail.dom');
          expect(newDoc.subject).to.equal('test email');
          expect(newDoc.data).to.equal('blah');
        });
      });
    });
    describe('#allEmail()', function() {
      it('Returns an array', function() {
        db.mails.all(function(err, docs) {
          expect(docs).to.be.a('Array');
        });
      });
      it('Returns no error', function() {
        db.mails.all(function(err, docs) {
          expect(err).to.be.undefined;
        });
      });
      it('Returns an empty array with no elements', function() {
        db.mails.all(function(err, docs) {
          expect(docs).to.have.lengthOf(0);
        });
      });
      it('Returns the saved element after a save', function() {
        db.mails.save({
          from: "name@mail.dom",
          subject: "test email",
          data: "blah"
        });
        db.mails.all(function(err, docs) {
          expect(docs).to.have.lengthOf(1);
          expect(docs[0].from).to.equal('name@mail.dom');
          expect(docs[0].subject).to.equal('test email');
          expect(docs[0].data).to.equal('blah');
        });
      });
    });
  });
});
