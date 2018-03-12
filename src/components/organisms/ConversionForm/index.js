import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { ReduxField, Heading, Button } from 'components';

const Form = styled.form`
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
`;

export default class ConversionForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool,
  };

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <Form onSubmit={handleSubmit}>
        <div>
          <Field name="full_name" label="Full Name" component={ReduxField} />
          <Field
            name="email"
            label="Email"
            type="email"
            component={ReduxField}
          />
          <Field name="phone" label="Phone" component={ReduxField} />
          <Button type="submit" disabled={submitting}>
            Contact
          </Button>
          <div>
            {' '}
            By continuing, you agree to Seniorly's Terms of Use and Privacy
            Policy
          </div>
        </div>
      </Form>
    );
  }
}
