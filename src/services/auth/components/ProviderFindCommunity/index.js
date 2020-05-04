import React, { Component } from 'react';
import { func, bool, string, arrayOf, object } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import { getAutocompleteValues } from 'sly/services/datatable/helpers';
import { normalizeResponse } from 'sly/services/api';
import pad from 'sly/components/helpers/pad';
import textAlign from 'sly/components/helpers/textAlign';
import ReduxField from 'sly/components/organisms/ReduxField';
import { Heading, Button, Block, Link } from 'sly/components/atoms';


const StyledHeading = textAlign(pad(Heading));
StyledHeading.displayName = 'StyledHeading';

const StyledButton = styled(Button)`
  width: 100%;
  margin-bottom: ${size('spacing.large')};
`;

const Continue = textAlign(Block);
Continue.displayName = 'Continue';


export default class ProviderFindCommunity extends Component {
  static propTypes = {
    handleSubmit: func.isRequired,
    submitting: bool,
    error: string,
    onNotFound: func,
    onSelectChange: func,
    community: arrayOf(object),
  };

  state = {
    inputValue: ''
  };

  onInputChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, '');
    this.setState({ inputValue });
    return inputValue;
  };

  render() {
    const { handleSubmit, submitting, error, onNotFound, onSelectChange, community } = this.props;
    return (
      <>
        <StyledHeading size="subtitle">What is the name of the community you want to manage?</StyledHeading>
        <Heading>This is the community: {community? community.label : 'not found'}</Heading>
        <Field
          name="community"
          label="Community Name"
          type="community"
          placeholder="Enter Community Name"
          cacheOptions
          value={community}
          onChange={option =>  onSelectChange(option)}
          //onInputChange={this.onInputChange}
          component={ReduxField}
        />
        <StyledButton type="submit" disabled={submitting}>
          Continue
        </StyledButton>
        {error && <Block palette="danger">{error}</Block>}
        <Continue size="caption">
          <Link onClick={onNotFound}>Can't find my community?</Link>
        </Continue>
      </>
    );
  }
}
