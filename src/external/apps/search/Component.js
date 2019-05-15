import React, { Component } from 'react';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import textAlign from 'sly/components/helpers/textAlign';
import pad from 'sly/components/helpers/pad';
import { Box, Heading, Hr } from 'sly/components/atoms';
import SearchBoxContainer from 'sly/containers/SearchBoxContainer';

const Wrapper = styled.div`
  padding: ${size('spacing.large')};
`;

const CenteredHeading = pad(textAlign(Heading), 'large');

const StyledHr = styled(Hr)`
  margin-left: -${size('spacing.xLarge')};
  margin-right: -${size('spacing.xLarge')};
`;

export default class SearchComponent extends Component {
  render() {
    return (
      <Wrapper>
        <Box>
          <CenteredHeading size="subtitle">Find The Best Assisted Living Near Me</CenteredHeading>
          <SearchBoxContainer
            hasShadow
            clearLocationOnBlur={false}
          />
          <StyledHr />
        </Box>
      </Wrapper>
    );
  }
}
