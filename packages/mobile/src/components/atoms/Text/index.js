import React from 'react';
import { any } from 'prop-types';
import styled from 'styled-components';

import styles from 'sly/common/components/themes/default';
import { withText, withColor } from 'sly/common/components/helpers';

const baseColor = styles.palette.slate.base;

const StyledText = styled.Text`
  fontFamily: 'Azo Sans';
  color: ${baseColor};
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  ${withText}
  ${withColor}
`;

// skip padding prop from being passed down. padding is a valid react native prop
// but our string padding used in css styles is different. Hence skip that prop.
const Text = ({ padding, ...props }) => <StyledText {...props} />;
Text.propTypes = {
  padding: any,
};

export default Text;
