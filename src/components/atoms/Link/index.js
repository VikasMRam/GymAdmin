import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { matchPath } from 'react-router-dom';
import RRLink from 'react-router-dom/Link';
import { string, oneOf } from 'prop-types';

import { size, palette, getKey } from 'sly/components/themes';
import { routes as routesPropType } from 'sly/propTypes/routes';
import { variation as variationPropType } from 'sly/propTypes/variation';

const getSize = type => p => size(type, p.size);
const getColor = ({ palette: paletteProp, variation }) => palette(paletteProp, variation);

const isLinkToAllowed = (routes, to) => {
  return routes.some(route => matchPath(to, route));
};

export const styles = css`
  color: ${getColor};
  text-decoration: none;

  &:hover {
    color: ${palette('filler')};
    cursor: pointer;
  }

  &:active {
    color: ${getColor};
  }

  &:focus {
    outline: none;
  }
  font-size: ${getSize('text')};
  line-height: ${getSize('lineHeight')};
  font-weight: ${p => size('weight', p.weight)};
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
    palette: oneOf(Object.keys(getKey('palette'))),
    variation: variationPropType,
  };

  static defaultProps = {
    palette: 'primary',
    variation: 'base',
    size: 'body',
    weight: 'regular',
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
      ? { target: '_blank', rel: 'noopener' }
      : { };
    return <Anchor {...target} {...props} />;
  }
}
