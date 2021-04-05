import React from 'react';

import Heading from 'sly/common/system/Heading';
import Block from 'sly/common/system/Block';
import Box from 'sly/common/system/Box';

export const Cases = (props) => <Box display="flex" p="xl" pad="xxl" {...props} />
export const Case = ({ name, children, ...props }) => (
  <Block mr="gutter" {...props}>
    <Heading
      font="label"
      fontSize="body-s"
      color="slate.lighter-40"
      pad="xs"
    >
      {name}
    </Heading>
    {children}
  </Block>
);
