# joi-extension-string-validFromRefs
An extension to Joi to enable checking that a string is composed from a number of refs.

In the below example we are confirming that `fullName` is composed from `firstName` and `lastName`

```javascript
var Joi = require('joi').extend(require('joi-extension-string-valid-from-refs'));

var schema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  fullName: Joi.string().required().validFromRefs(['lastName', 'firstName'], ', ')
});

var input = {
  fistName: 'John',
  lastName: 'Smith',
  fullName: 'Smith, John'
};

Joi.assert(input, schema)
```
