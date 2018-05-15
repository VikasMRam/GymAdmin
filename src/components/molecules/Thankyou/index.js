import React from 'react';
import { shape, string, func } from 'prop-types';

import styled, { css } from 'styled-components';

import { Button, Block, Icon, Heading } from 'sly/components/atoms';
import { size } from 'sly/components/themes';
import AgentTile from "sly/components/molecules/AgentTile";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const StyledIcon = styled(Icon)`
  margin-bottom: ${size('spacing.regular')}; 
`;

const StyledHeading = styled(Heading)`
  margin-bottom: ${size('spacing.regular')};
`;

const StyledBlock = styled(Block)`
  padding: ${size('spacing.regular')};
  margin: 0 ${size('spacing.large')};
  margin-bottom: ${size('spacing.large')};
`;

const Thankyou = ({ community, onClose }) => (
  <Wrapper>
    <StyledIcon icon="logo" size="xLarge" />
    <StyledHeading>Thank you!</StyledHeading>
    <StyledBlock>
      Your request has been successfully sent to
      {' '}{community.name}.
    </StyledBlock>
    <AgentTile community={ {...community, uri:'#' } } user={{name:'Test'}}/>
    {onClose && <Button onClick={onClose} kind="jumbo">Done</Button>}
  </Wrapper>
);

Thankyou.propTypes = {
  community: shape({
    name: string.isRequired,
  }).isRequired,
  onClose: func.isRequired,
};

export default Thankyou;

