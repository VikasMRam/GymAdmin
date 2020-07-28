import React, { Component } from 'react';
import { func, bool, string, object } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/common/components/themes';
import pad from 'sly/web/components/helpers/pad';
import { Heading, Button, Block } from 'sly/web/components/atoms';
import ButtonLink from 'sly/common/components/molecules/ButtonLink';
import Field from 'sly/common/components/molecules/Field';
import { textAlign } from 'sly/web/components/helpers/text';

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
          <ButtonLink palette="primary" onClick={onNotFound}>Can&apos;t find my community?</ButtonLink>
        </Continue>
      </form>
    );
  }
}
