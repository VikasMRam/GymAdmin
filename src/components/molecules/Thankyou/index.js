import React from 'react';
import { shape, string, func } from 'prop-types';

import styled, { css } from 'styled-components';

import { Button, Block, Icon, Heading } from 'sly/components/atoms';
import { size } from 'sly/components/themes';

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
  margin-bottom: ${size('spacing.large')};
`;

const Thankyou = ({ community, onClose }) => (
  <Wrapper>
    <StyledIcon icon="logo" size="xLarge" />
    <StyledHeading>Thank you!</StyledHeading>
    {/*<StyledBlock>*/}
      {/*Your request has been successfully sent to*/}
      {/*{' '}{community.name}. A local expert will also be in touch shortly.*/}
    {/*</StyledBlock>*/}
    <StyledBlock>
      Your request has been successfully sent to
      {' '}{community.name}. To ensure a personalized experience, a local expert will also be in touch.
    </StyledBlock>
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

