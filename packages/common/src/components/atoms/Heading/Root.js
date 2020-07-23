import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';

const H1 = styled.h1``;
const H2 = styled.h2``;
const H3 = styled.h3``;

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
