import isEmail from 'validator/lib/isEmail';
import isInt from 'validator/lib/isInt';
import isIn from 'validator/lib/isIn';
import isURL from 'validator/lib/isURL';
import isMobilePhone from 'validator/lib/isMobilePhone';
import isFloat from 'validator/lib/isFloat';
import dayjs from 'dayjs';

const isEmpty = value => value === undefined || value === null ||
  (value && value.trim ? value.trim() === '' : value === '');
const join = rules => (value, data) =>
  rules.map((rule) => {
    const result = rule(value, data);
    const ruleName = rule.name;
    return { result, ruleName };
  }).filter(error => !!error.result)[0];

export const email = value =>
  !isEmpty(value) && !isEmail(value.replace(/ /g, '')) && 'Invalid email address';

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

export const dependentRequired = (field, errorMessage = `Either this field or ${field} is required`) =>
  (value, allValues = {}) => isEmpty(value) && isEmpty(allValues[field]) && errorMessage;

export const isValidRating = value => (isNaN(value) || value === 0) && 'At least one star';

export const notProvided = value => !isEmpty(value) && 'Value should be empty';

export const minLength = min => value =>
  !isEmpty(value) && value.length < min && `Must be at least ${min} characters`;

export const maxLength = max => value =>
  !isEmpty(value) &&
  value.length > max &&
  `Must be no more than ${max} characters`;

export const integer = value => !isInt(value) && 'Must be an integer';

export const float = value => !isEmpty(value) && !isFloat(value) && 'Must be a numeric value';

export const usPhone = value =>
  !isEmpty(value) && !isMobilePhone(value.replace(/-/g, ''), 'en-US') && 'Invalid phone number';

export const mmDdYyyyy = value =>
  !isEmpty(value) && !integer(value.replace(/\//g, '')) && value.replace(/\//g, '').length !== 8 && 'Invalid date';

export const oneOf = values => value =>
  !isIn(value, values) && `Must be one of: ${values.join(', ')}`;

export const match = field => (value, data) =>
  data && value !== data[field] && 'Must match';

export const isBeforeNow = value => value && dayjs(value).isAfter(dayjs(), 'day') && `Must be before ${new Date().toDateString()}`;

export const isAfterNow =  value => value && dayjs(value).isBefore(dayjs(), 'day') && `Must be after ${new Date().toDateString()}`;

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
