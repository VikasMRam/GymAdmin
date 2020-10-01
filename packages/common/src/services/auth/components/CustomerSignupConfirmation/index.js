import React from 'react';
import { func, object } from 'prop-types';

import { Icon, Heading, Button, Paragraph, Block } from 'sly/common/components/atoms';

const CustomerSignupConfirmation = ({ onSubmit, user }) => (
  <Block display="flex" align="center" direction="column">
    <Icon icon="checkmark-circle" palette="primary" variation="base" size="hero" pad="large" />
    <Heading pad="large">Welcome {user ? user.name : '?'}</Heading>
    <Paragraph>Your account is all set up</Paragraph>
    <Button pad="large" width="100%" onClick={onSubmit}>Continue</Button>
  </Block>
);

CustomerSignupConfirmation.propTypes = {
  onSubmit: func.isRequired,
  user: object.isRequired,
};

export default CustomerSignupConfirmation;
