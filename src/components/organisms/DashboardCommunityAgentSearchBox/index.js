import React from 'react';
import { func, string } from 'prop-types';
import styled from 'styled-components';
import { reduxForm, Field } from 'redux-form';

import { size } from 'sly/components/themes';
import { Label } from 'sly/components/atoms';
import IconButton from 'sly/components/molecules/IconButton';
import ReduxField from 'sly/components/organisms/ReduxField';
import SearchBoxContainer from 'sly/containers/SearchBoxContainer';
import { filterLinkPath, getSearchParamFromPlacesResponse } from 'sly/services/helpers/search';

const Form = styled.form`
  display: flex;
  align-items: center;
`;
const LocationSearchBox = styled.div`
  margin-right: ${size('spacing.regular')};
  display: flex;
  flex-direction: column;
  flex-grow: 2;
`;
const CommunityTextBox = styled(Field)`
  margin-right: ${size('spacing.regular')};
  flex-grow: 2;
`;

const CommunityAgentSearchForm = ({ label, handleLocationSearch, handleSubmit }) => {
  console.log('Seeing handle Location Change', handleLocationSearch);

  return (
    <Form onSubmit={handleSubmit} name="CommunityAgentSearchForm" >
      {/*<LocationSearchBox>
        <Label>Search by Location</Label>
        <SearchBoxContainer
          allowOnlySelectionFromSuggestions
          clearLocationOnBlur={false}
          onLocationSearch={handleSubmit}
        />
      </LocationSearchBox>*/}
      <CommunityTextBox name="city" label="Search By City, State" type="text" placeholder="Search by city, state" component={ReduxField} />
      <CommunityTextBox name="name" label={label} type="text" placeholder="Search by name" component={ReduxField} />
      <IconButton type="submit" icon="search" />
    </Form>
  );
};

CommunityAgentSearchForm.propTypes = {
  label: string,
  handleSubmit: func.isRequired,
  handleLocationSearch: func.isRequired,
};

const ReduxForm = reduxForm({
  form: 'CommunityAgentSearchForm',
  destroyOnUnmount: false,
  // required to refresh when initialValues change. Ref: https://redux-form.com/6.7.0/examples/initializefromstate/
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(CommunityAgentSearchForm);

const DashboardCommunityAgentSearchBox = ({ label, handleSubmit }) => <ReduxForm label={label} onSubmit={handleSubmit} />;

DashboardCommunityAgentSearchBox.propTypes = {
  label: string,
  handleSubmit: func.isRequired,
};

export default DashboardCommunityAgentSearchBox;
