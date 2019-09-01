import React from 'react';
import { func } from 'prop-types';
import styled from 'styled-components';
import { reduxForm, Field } from 'redux-form';

import { size } from 'sly/components/themes';
import IconButton from 'sly/components/molecules/IconButton';
import ReduxField from 'sly/components/organisms/ReduxField';

const Form = styled.form`
  display: flex;
  align-items: center;
`;

const CommunityTextBox = styled(Field)`
  margin-right: ${size('spacing.regular')};
  flex-grow: 2;
`;

const CommunityAgentSearchForm = ({ handleSubmit }) => {
  return (
    <Form onSubmit={handleSubmit} name="CommunitySearchForm" >
      <CommunityTextBox name="name" label="Find a community" type="text" placeholder="Search by zip code or community name" component={ReduxField} />
      <IconButton type="submit" icon="search" />
    </Form>
  );
};

CommunityAgentSearchForm.propTypes = {
  handleSubmit: func.isRequired,
};

const ReduxForm = reduxForm({
  form: 'CommunityAgentSearchForm',
  destroyOnUnmount: false,
  // required to refresh when initialValues change. Ref: https://redux-form.com/6.7.0/examples/initializefromstate/
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(CommunityAgentSearchForm);

const DashboardCommunityAgentSearchBox = ({ handleSubmit }) => <ReduxForm onSubmit={handleSubmit} />;

DashboardCommunityAgentSearchBox.propTypes = {
  handleSubmit: func.isRequired,
};

export default DashboardCommunityAgentSearchBox;
