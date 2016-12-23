'use strict';

/* jshint expr:true */

const joi = require('joi').extend(require('../index.js'));
const expect = require('chai').expect;

describe('validFromRefs', function(done) {
  const value = {
    worldid:'WORLDID',
    day:'DAY',
    key:'WORLDID:DAY'
  };
  
  it('should be good', function(done) {
    const schema = {
      worldid: joi.string().required(),
      day: joi.string().required(),
      key: joi.string().required().validFromRefs(['worldid', 'day'], ':')
    };

    joi.validate(value, schema, function(err, value) {
      expect(err).to.not.exist;
      done(err);
    });
  });

  it('should fail', function(done) {
    const schema = {
      worldid: joi.string().required(),
      day: joi.string().required(),
      key: joi.string().required().validFromRefs(['worldid', 'day'], 'x')
    };

    joi.validate(value, schema, function(err, value) {
      expect(err.toString()).to.equal('ValidationError: child "key" fails because ["key" must be one of WORLDIDxDAY]');
      done();
    });
  });

  it('should be good', function(done) {
    const value = {
      firstName:'John',
      lastName:'Smith',
      fullName:'Smith, John'
    };
    const schema = {
      firstName: joi.string().required(),
      lastName: joi.string().required(),
      fullName: joi.string().required().validFromRefs(['lastName', 'firstName'], ', ')
    };

    joi.validate(value, schema, function(err, value) {
      expect(err).to.not.exist;
      done(err);
    });
  });
});
