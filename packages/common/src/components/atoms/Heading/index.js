import React from 'react';
import styled from 'styled-components';

import props from './props';
import getTag from './getTag';
import getMarginBottom from './getMarginBottom';

import {
  withText,
  withColor,
} from 'sly/common/components/helpers';

const Heading = styled((props) => {
  const HeadingTag = getTag(props.level);
  return (
    <HeadingTag
      size={props.size || props.level}
      {...props}
    />
  );
})`
  margin-bottom: ${getMarginBottom};
  ${withText}
  ${withColor}
`;

Heading.propTypes = props.propTypes;

Heading.defaultProps = props.defaultProps;

export default Heading;
