import React from 'react';
import { string } from 'prop-types';
import styled, { css } from 'styled-components';

import {
  withText,
  withColor,
  withSpacing,
  withAlign,
} from 'sly/common/components/helpers';

const styles = css`
  ${withSpacing}
  ${withText}
  ${withColor}
  ${withAlign}
`;

const H1 = styled.h1`${styles}`;
const H2 = styled.h2`${styles}`;
const H3 = styled.h3`${styles}`;

const Root = (props) => {
  switch (props.level) { /* eslint-disable jsx-a11y/heading-has-content */
    case 'hero': return <H1 {...props} />;
    case 'title': return <H2 {...props} />;
    case 'subtitle': return <H3 {...props} />;
    default: return <H1 {...props} />;
  }
};

Root.propTypes = {
  level: string,
};

export default Root;
