import React from 'react';
import { func } from 'prop-types';
import styled from 'styled-components';

import { size, palette } from 'sly/components/themes';
import { Block, Box, Button, Heading } from 'sly/components/atoms';
import shadow from 'sly/components/helpers/shadow';
import Icon from 'sly/components/atoms/Icon';
import pad from 'sly/components/helpers/pad';

const Wrapper = styled(shadow(Box))`
  margin: 0 auto;
  text-align: center;
  padding: ${size('spacing.xxLarge')} ${size('spacing.xLarge')};
  width: ${size('mobileLayout.col4')};
  > ${Heading}, > ${Icon} {
    margin-bottom: ${size('spacing.large')};
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: ${size('layout.col6')};
  }
`;

const PaddedBlock = pad(Block, 'xLarge');

const RejectButton = styled(Button)`
  border-color: ${palette('slate.stroke')};
  width: 100%;
  margin-bottom: 0;
`;

const PostConversionGreeting = ({
  onReject,
}) => (
  <Wrapper>
    <Icon icon="checkmark-circle" size="xLarge" palette="green" />
    <Heading level="subtitle">You’re all set! Your Local Senior Living Expert will reach out shortly.</Heading>
    <PaddedBlock>Did you know your local expert can often negotiate fees on your behalf?</PaddedBlock>
    <RejectButton ghost palette="danger" onClick={onReject}>Don’t want help from an expert? Click here.</RejectButton>
  </Wrapper>
);

PostConversionGreeting.propTypes = {
  onReject: func.isRequired,
};

export default PostConversionGreeting;
