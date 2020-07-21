import React from 'react';
import styled from 'styled-components/native';

import styles  from './styles';
import { textStyles } from './styles.common';
import props  from './props';

const StyledView = styled.View`
  ${styles}
`;

const StyledText = styled.Text`
  ${textStyles}
`;

const Badge = props => <StyledView {...props}><StyledText {...props} /></StyledView>;

Badge.propTypes = props.propTypes;

Badge.defaultProps = props.defaultProps;

export default Badge;
