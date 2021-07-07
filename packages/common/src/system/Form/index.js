import React from 'react';
import { Form } from 'react-final-form';
import { node, func } from 'prop-types';

const FinalForm = props => (
  <Form
    onSubmit={props.onSubmit}
    render={renderProps => (
      <form onSubmit={renderProps.handleSubmit}>
        {props.children(renderProps)}
      </form>
  )}
  />
);

FinalForm.defaultProps = {
  onSubmit: () => {},
};

FinalForm.propTypes = {
  children: node,
  onSubmit: func,
};

export default FinalForm;
