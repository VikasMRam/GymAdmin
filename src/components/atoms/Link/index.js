import React from 'react';

import styled, { css } from 'styled-components';
import { palette } from 'styled-theme';
import { ifProp } from 'styled-tools';
import RRLink from 'react-router-dom/Link';

import { bool, string, oneOf } from 'prop-types';

import { size } from 'sly/components/themes';

const styles = css`
  color: ${palette(0)};
  text-decoration: none;

  &:hover {
    color: ${palette(2)};
    cursor: pointer;
  }

  &:active {
    color: ${palette(0)};
  }

  &:focus {
    outline: none;
  }
`;

export const Anchor = styled.a`
  ${styles};
`;

const StyledLink = styled(RRLink)`
  ${styles};
`;

const Link = ({ ...props }) => {
  if (props.to) {
    return <StyledLink {...props} />;
  } else {
    return <Anchor {...props} />;
  }
};

Link.propTypes = {
  to: string,
  href: string,
};

Link.defaultProps = {
  palette: 'primary',
};

export default Link;
