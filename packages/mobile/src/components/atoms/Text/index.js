import React from 'react';
import styled from 'styled-components';

import styles from 'sly/common/components/themes/default';

const baseColor = styles.palette.slate.base;

const StyledText = styled.Text`
  fontFamily: 'Azo Sans';
  color: ${baseColor};
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
`;

const Text = props => <StyledText {...props} />;

export default Text;
