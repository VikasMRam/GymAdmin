import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';

import {
  withAlign,
  withColor,
  withSpacing,
  withText,
} from 'sly/common/components/helpers';

const H1 = styled.h1``;
const H2 = styled.h2``;
const H3 = styled.h3``;
const H4 = styled.h4``;

const Root = styled((props) => {
  switch (props.level || props.size) { /* eslint-disable jsx-a11y/heading-has-content */
    case 'hero': return <H1 {...props} />;
    case 'title': return <H2 {...props} />;
    case 'subtitle': return <H3 {...props} />;
    case 'body': return <H4 {...props} />;
    default: return <H1 {...props} />;
  }
})`
  ${withSpacing}
  ${withText}
  ${withColor}
  ${withAlign}
`;

Root.propTypes = {
  size: string,
};

export default Root;
