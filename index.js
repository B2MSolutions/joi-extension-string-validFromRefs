'use strict';

const joi = require('joi');
const hoek = require('hoek');
const _ = require('lodash');

const  validFromRefs= {
  name: 'validFromRefs',
  params: {
    refs: joi.array().min(2),
    sep: joi.string().required()
  },
  validate: function(params, value, state, options) {
    const mapped = _.map(params.refs, function(key) {
      return hoek.reach(state.parent, joi.ref(key).key);
    });

    const expectedValue = _.join(mapped, params.sep);
    return value === expectedValue ? true : this.createError('string.validFromRefs', { v: expectedValue}, state, options);
  }
};

const rules = [].concat([validFromRefs]);

const extension = {
  base: joi.string(),
  name: 'string',
  language: {
    validFromRefs: 'must be one of {{v}}'
  },

  rules: rules
};

module.exports = extension;
