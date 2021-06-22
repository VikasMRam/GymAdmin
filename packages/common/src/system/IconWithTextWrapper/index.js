import React from 'react';

import Grid from 'sly/common/system/Grid';

const IconWithTextWrapper = props => (
  <Grid
    pad="xs"
    gridTemplateColumns="auto 1fr"
    gridGap="s"
    sx={{
      svg: {
        marginTop: 'xxs',
      },
    }}
    {...props}
  />);

export default IconWithTextWrapper;
