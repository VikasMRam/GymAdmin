import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { matchPath, Link as RRLink } from 'react-router-dom';
import { string, bool } from 'prop-types';
import { ifNotProp, ifProp } from 'styled-tools';

import { size, palette } from 'sly/components/themes';
import { palette as palettePropType } from 'sly/propTypes/palette';
import { routes as routesPropType } from 'sly/propTypes/routes';
import { variation as variationPropType } from 'sly/propTypes/variation';

const getSize = type => p => size(type, p.size);
const getColor = ({ palette: paletteProp, variation }) => palette(paletteProp, variation);

const isLinkToAllowed = (routes, to) => {
  const pathName = to.replace(/(\?|#).*/, '');
  return routes.some(route => matchPath(pathName, route));
};

export const styles = css`
  color: ${getColor};
  text-decoration: none;

  &:hover {
    color: ${ifNotProp('noHoverColorChange', palette('filler'))};
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
  
  ${ifProp('weight', css`
    font-weight: ${p => size('weight', p.weight)};
  `)}
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
    palette: palettePropType,
    variation: variationPropType,
    noHoverColorChange: bool,
  };

  static defaultProps = {
    palette: 'primary',
    variation: 'base',
    size: 'body',
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
