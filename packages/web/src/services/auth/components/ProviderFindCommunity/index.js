import React, { Component } from 'react';
import { func, bool, string, object } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import { getAutocompleteValues } from 'sly/services/datatable/helpers';
import { normalizeResponse } from 'sly/services/api';
import pad from 'sly/components/helpers/pad';
import textAlign from 'sly/components/helpers/textAlign';
import { Heading, Button, Block, Link } from 'sly/components/atoms';
import Field from 'sly/components/molecules/Field';


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
    community: object,
  };

  render() {
    const { handleSubmit, submitting, error, onNotFound, onSelectChange, community } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <StyledHeading size="subtitle">What is the name of the community you want to manage?</StyledHeading>
        <Field
          name="community"
          label="Community Name"
          type="community"
          placeholder="Enter Community Name"
          value={community}
          onChange={option =>  onSelectChange(option)}
        />
        <StyledButton type="submit" disabled={submitting}>
          Continue
        </StyledButton>
        {error && <Block palette="danger">{error}</Block>}
        <Continue size="caption">
          <Link onClick={onNotFound}>Can't find my community?</Link>
        </Continue>
      </form>
    );
  }
}