import isEmail from 'validator/lib/isEmail';
import isInt from 'validator/lib/isInt';
import isIn from 'validator/lib/isIn';
import isURL from 'validator/lib/isURL';
import isMobilePhone from 'validator/lib/isMobilePhone';

const isEmpty = value => value === undefined || value === null || value === '';
const join = rules => (value, data) =>
  rules.map((rule) => {
    const result = rule(value, data);
    const ruleName = rule.name;
    return { result, ruleName };
  }).filter(error => !!error.result)[0];

export const email = value =>
  !isEmpty(value) && !isEmail(value) && 'Invalid email address';

export const emails = (value) => {
  if (isEmpty(value)) {
    return 'Invalid email addresses';
  }

  const emails = value.split(',');
  for (let i = 0; i < emails.length; i += 1) {
    if (!isEmail(emails[i].replace(/ /g, ''))) {
      return 'Invalid email addresses';
    }
  }

  return null;
};

export const url = value => !isEmpty(value) && !isURL(value) && 'Invalid URL';

export const required = value => isEmpty(value) && 'Required field';

export const notZero = value => value === 0 && 'At least one star';

export const notProvided = value => !isEmpty(value) && 'Value should be empty';

export const minLength = min => value =>
  !isEmpty(value) && value.length < min && `Must be at least ${min} characters`;

export const maxLength = max => value =>
  !isEmpty(value) &&
  value.length > max &&
  `Must be no more than ${max} characters`;

export const integer = value => !isInt(value) && 'Must be an integer';

export const usPhone = value =>
  !isEmpty(value) && !isMobilePhone(value.replace(/-/g, ''), 'en-US') && 'Invalid phone number';

export const oneOf = values => value =>
  !isIn(value, values) && `Must be one of: ${values.join(', ')}`;

export const match = field => (value, data) =>
  data && value !== data[field] && 'Must match';

export const createValidator = (rules, messageObj) => (data = {}) => {
  const errors = {};
  Object.keys(rules).forEach((key) => {
    const rule = join([].concat(rules[key]));
    const error = rule(data[key], data);
    if (error) {
      if (messageObj && messageObj[key]) {
        const message = messageObj[key][error.ruleName];
        errors[key] = message;
      } else {
        errors[key] = error.result;
      }
    }
  });
  return errors;
};

export const createBooleanValidator = (rules) => {
  const validator = createValidator(rules);
  return data => Object.keys(validator(data)).length === 0;
};
