import React, { Component } from 'react';
import { func, string } from 'prop-types';
import styled from 'styled-components';
import { reduxForm, Field } from 'redux-form';

import { size } from 'sly/components/themes';
import IconButton from 'sly/components/molecules/IconButton';
import ReduxField from 'sly/components/organisms/ReduxField';
import { createValidator, dependentRequired } from 'sly/services/validation';

const Form = styled.form`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    flex-direction: row;
    align-items: center;
  }
`;

const StyledField = styled(Field)`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin-right: ${size('spacing.regular')};
    flex-grow: 2;
  }
`;

const CommunityAgentSearchForm = ({ label, handleSubmit }) => {
  return (
    <Form onSubmit={handleSubmit} name="CommunityAgentSearchForm" >
      <StyledField name="geo" label="Search By City, State" type="locationSearch" placeholder="Search By City, State" component={ReduxField} />
      <StyledField name="name" label={label} type="text" placeholder="Search by name" component={ReduxField} />
      <IconButton type="submit" icon="search" />
    </Form>
  );
};

CommunityAgentSearchForm.propTypes = {
  label: string,
  handleSubmit: func.isRequired,
};

const geoNameDependentValidateMessage = 'Either search by city/state or by name';
const validate = createValidator({
  geo: [dependentRequired('name', geoNameDependentValidateMessage)],
  name: [dependentRequired('geo', geoNameDependentValidateMessage)],
});


const form = 'CommunityAgentSearchForm';
const ReduxForm = reduxForm({
  form,
  validate,
})(CommunityAgentSearchForm);

class DashboardCommunityAgentSearchBox extends Component {
  render() {
    const { label, handleSubmit } = this.props;
    return (
      <ReduxForm
        label={label}
        onSubmit={handleSubmit}
      />
    );
  }
}

DashboardCommunityAgentSearchBox.propTypes = {
  label: string,
  handleSubmit: func.isRequired,
};

export default DashboardCommunityAgentSearchBox;
