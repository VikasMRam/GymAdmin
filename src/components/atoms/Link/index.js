import React, { Component } from 'react';

import styled, { css } from 'styled-components';
import { palette } from 'styled-theme';
import RRLink from 'react-router-dom/Link';

import { string, shape, func, object } from 'prop-types';

import { isLinkToAllowed } from 'sly/services/helpers/url';

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

const checkLink = (props) => {
   
};

export default class Link extends Component {
  static propTypes = {
    to: string,
    href: string,
  };

  static defaultProps = {
    palette: 'primary',
  };

  static contextTypes = {
    router: object.isRequired,
  };

  checkPropsForLinks() {
    const { to, ...props } = this.props;

    if (to && !isLinkToAllowed(to)) {
      return {
        href: to,
        ...props,
      };
    }

    return this.props;
  }

  render() {
    const props = this.checkPropsForLinks();
    if (props.to) {
      return <StyledLink {...props} />;
    }
    return <Anchor {...props} />;
  }
};

