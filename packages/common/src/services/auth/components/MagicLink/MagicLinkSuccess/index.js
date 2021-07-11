import React from 'react';
import { func, string, bool } from 'prop-types';

import MagicLinkOval from '../MagicLinkOval';

import { Block, Flex, Heading, Hr, Span } from 'sly/common/system';
import ButtonLink from 'sly/common/components/molecules/ButtonLink/newSystem';


const MagicLinkSuccess = ({ email, passwordExists, onPasswordLoginClick, resendEmail }) => {
  return (
    <Flex alignItems="center" flexDirection="column">
      <MagicLinkOval />
      <Heading pad="m" font="title-m">Check your email!
      </Heading>
      <Block pad="l">We just sent an email to <Span font="title-xs-azo" >{email}</Span>.
        Click the magic link to log in automatically.
      </Block>
      <Block>Didn’t get the email?
        <ButtonLink onClick={resendEmail}> Resend</ButtonLink>
      </Block>
      <Hr my="l" width="xxxl" />
      {passwordExists &&
      <Block> Or you can
        <ButtonLink onClick={onPasswordLoginClick}> log in with a password</ButtonLink>
      </Block>}
    </Flex>
  );
};

MagicLinkSuccess.propTypes = {
  email: string.isRequired,
  passwordExists: bool,
  onPasswordLoginClick: func.isRequired,
  resendEmail: func.isRequired,
};


export default MagicLinkSuccess;
