import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';

import {
  withAlign,
  withColor,
  withSpacing,
  withText,
  withClamping,
  withDisplay,
} from 'sly/common/components/helpers';

const H1 = styled.h1``;
const H2 = styled.h2``;
const H3 = styled.h3``;
const H4 = styled.h4``;

const HeadingRoot = styled(({ innerRef, ...props }) => {
  switch (props.level || props.size) { /* eslint-disable jsx-a11y/heading-has-content */
    case 'hero':
    case 'superHero':
    case 'displayL':
      return <H1 ref={innerRef} {...props} />;
    case 'title':
    case 'display':
      return <H2 ref={innerRef} {...props} />;
    case 'subtitle':
    case 'displayS':
      return <H3 ref={innerRef} {...props} />;
    case 'body': return <H4 ref={innerRef} {...props} />;
    default: return <H1 ref={innerRef} {...props} />;
  }
})`
  ${withSpacing}
  ${withText}
  ${withColor}
  ${withAlign}
  ${withClamping}
  ${withDisplay}
`;

HeadingRoot.propTypes = {
  size: string,
};

const Root = React.forwardRef((props, ref) => <HeadingRoot innerRef={ref} {...props} />);

export default Root;
