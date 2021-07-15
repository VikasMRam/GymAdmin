import React from 'react';
import { func, string } from 'prop-types';

import MagicLinkOval from '../MagicLinkOval';

import {  Flex, Heading, Hr, Block } from 'sly/common/system';
import ButtonLink from 'sly/common/components/molecules/ButtonLink/newSystem';


const MagicLinkExpired = ({ onLoginClick, status }) => {
  const expired = 'Oops! Your log in link has expired.';
  const error = 'Oops! Something went wrong with this magic link.';

  let text = expired;

  if (status === 'error') {
    text = error;
  }

  return (
    <Flex alignItems="center" flexDirection="column">
      <MagicLinkOval ovalColor="red.lighter-90" iconColor="red" />
      <Heading font="title-m">{text}
      </Heading>
      <Block>Please go back to log in to request a new magic link.</Block>
      <Hr my="l" width="xxxl" />
      <ButtonLink onClick={onLoginClick}>Back to log in</ButtonLink>
    </Flex>
  );
};

MagicLinkExpired.propTypes = {
  onLoginClick: func,
  status: string,
};

export default MagicLinkExpired;
