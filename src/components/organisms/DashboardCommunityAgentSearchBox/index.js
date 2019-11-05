import React, { Component } from 'react';
import { func, string } from 'prop-types';
import styled from 'styled-components';
import { reduxForm, Field, change } from 'redux-form';

import { size } from 'sly/components/themes';
import { Label } from 'sly/components/atoms';
import IconButton from 'sly/components/molecules/IconButton';
import ReduxField from 'sly/components/organisms/ReduxField';
import SearchBoxContainer from 'sly/containers/SearchBoxContainer';

const Form = styled.form`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    flex-direction: row;
    align-items: center;
  }
`;
const LocationSearchBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin-right: ${size('spacing.regular')};
    flex-grow: 2;
  }
`;
const CommunityTextBox = styled(Field)`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin-right: ${size('spacing.regular')};
    flex-grow: 2;
  }
`;

const CommunityAgentSearchForm = ({ label, handleLocationChange, handleLocationTextChange, handleSubmit, dispatch }) => {
  return (
    <Form onSubmit={handleSubmit} name="CommunityAgentSearchForm" >
      <LocationSearchBox>
        <Label>Search By City, State</Label>
        <SearchBoxContainer
          allowOnlySelectionFromSuggestions
          clearLocationOnBlur={false}
          onLocationSearch={value => handleLocationChange(value, dispatch)}
          onTextChange={value => handleLocationTextChange(value, dispatch)}
        />
      </LocationSearchBox>
      <CommunityTextBox name="name" label={label} type="text" placeholder="Search by name" component={ReduxField} />
      <IconButton type="submit" icon="search" />
    </Form>
  );
};

CommunityAgentSearchForm.propTypes = {
  label: string,
  handleSubmit: func.isRequired,
  handleLocationChange: func.isRequired,
  handleLocationTextChange: func.isRequired,
  dispatch: func,
};

const form = 'CommunityAgentSearchForm';
const ReduxForm = reduxForm({
  form,
  destroyOnUnmount: false,
  // required to refresh when initialValues change. Ref: https://redux-form.com/6.7.0/examples/initializefromstate/
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(CommunityAgentSearchForm);

class DashboardCommunityAgentSearchBox extends Component {
  handleLocationChange = (value, dispatch) => {
    const { handleSubmit } = this.props;
    if (handleSubmit && value && value.geometry && value.geometry.location) {
      const geo = [value.geometry.location.lat(), value.geometry.location.lng(), 10].join(',');
      dispatch(change(form, 'geo', geo));
      handleSubmit({ geo });
    }
  };

  handleLocationTextChange = (value, dispatch) => {
    if (value === '') {
      dispatch(change(form, 'geo', null));
    }
  }

  render() {
    const { label, handleSubmit } = this.props;
    return (
      <ReduxForm
        label={label}
        onSubmit={handleSubmit}
        handleLocationChange={this.handleLocationChange}
        handleLocationTextChange={this.handleLocationTextChange}
      />
    );
  }
}

DashboardCommunityAgentSearchBox.propTypes = {
  label: string,
  handleSubmit: func.isRequired,
};

export default DashboardCommunityAgentSearchBox;
