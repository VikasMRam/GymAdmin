import React, { Component } from 'react';

import styled, { css } from 'styled-components';
import { palette } from 'styled-theme';
import RRLink from 'react-router-dom/Link';
import { matchPath } from 'react-router-dom';
import { string, array } from 'prop-types';

import { routes as routesPropType } from 'sly/propTypes/routes';

const isLinkToAllowed = (routes, to) => {
  return routes.some(route => matchPath(to, route));
};

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

export default class Link extends Component {
  static propTypes = {
    to: string,
    href: string,
  };

  static defaultProps = {
    palette: 'secondary',
  };

  static contextTypes = {
    routes: routesPropType,
  };

  checkPropsForLinks() {
    const { to, ...props } = this.props;
    const { routes } = this.context;

    if (to && routes && !isLinkToAllowed(routes, to)) {
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
    const target = props.href && props.href.match(/https?:\/\//)
      ? { target: '_blank' }
      : { };
    return <Anchor {...target} {...props} />;
  }
};

