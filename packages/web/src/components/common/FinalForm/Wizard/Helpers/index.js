
import React from 'react';
import { func, node, oneOfType, string } from 'prop-types';
import { Field } from 'react-final-form';

export const Error = ({ name }) => (
  <Field
    name={name}
    subscription={{ touched: true, error: true }}
    render={({ meta: { touched, error } }) =>
      touched && error ? <span>{error}</span> : null
    }
  />
);

Error.propTypes = {
  name: string,
};

export const Condition = ({ when, is, children }) => (
  <Field name={when} subscription={{ value: true }}>
    {({ input: { value } }) => (value === is ? children : null)}
  </Field>
);

Condition.propTypes = {
  when: string,
  is: string,
  children: node,
};

export const ConditionalField = ({ when, is, children }) => (
  <Field name={when} subscription={{ value: true }}>
    {({ input: { value } }) => {
      if (typeof is === 'function') {
        return is(value) ? children : null;
      } else if (is === value) {
        return children;
      }
        return null;
      }
    }
  </Field>
);

ConditionalField.propTypes = {
  when: string,
  is: oneOfType([string, func]),
  children: node,
};
