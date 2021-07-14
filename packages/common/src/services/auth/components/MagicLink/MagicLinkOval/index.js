import React from 'react';
import { string } from 'prop-types';

import { Flex } from 'sly/common/system';
import { Awesome } from 'sly/common/icons';

const MagicLinkOval = ({ ovalColor, iconColor }) => (
  <Flex pad="m" borderRadius="50%" justifyContent="center" alignItems="center" background={ovalColor} height="xxxl" width="xxxl" >
    <Awesome size="l" color={iconColor} />
  </Flex>
);

MagicLinkOval.propTypes = {
  ovalColor: string,
  iconColor: string,
};

MagicLinkOval.defaultProps = {
  ovalColor: 'viridian.lighter-90',
  iconColor: 'primary',
};

export default MagicLinkOval;
