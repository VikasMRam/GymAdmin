import React from 'react';

import Field from '.';

import { Block, Box } from 'sly/common/components/atoms';

export const labelRight = (
  <Block palette="primary" size="caption">
    Forgot password?
  </Block>
);

export const optionsList = [{ value: 'sms', label: 'SMS' }, { value: 'email', label: 'Email' }, { value: 'phone', label: 'Phone' }];

export const generateViews = props => (
  <>
    <Box>
      <Field {...props} />
    </Box>
    <Block margin="large">Horizontal</Block>
    <Box>
      <Field {...props} wideWidth />
    </Box>
  </>
);
