import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { Link as RRLink } from 'react-router-dom';
import { string, bool } from 'prop-types';
import { ifNotProp, ifProp } from 'styled-tools';

import { size, palette } from 'sly/components/themes';
import { palette as palettePropType } from 'sly/propTypes/palette';
import { routes as routesPropType } from 'sly/propTypes/routes';
import { variation as variationPropType } from 'sly/propTypes/variation';
import isPathInRoutes from 'sly/services/helpers/isPathInRoutes';

const getSize = type => p => size(type, p.size);
const getColor = ({ palette: paletteProp, variation }) => palette(paletteProp, variation);

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
  ${ifProp('size', css`
    font-size: ${getSize('text')};
  `)};
  
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
  };

  static contextTypes = {
    routes: routesPropType,
  };

  checkPropsForLinks() {
    const { to, ...props } = this.props;
    const { routes } = this.context;
    if (to && !isPathInRoutes(routes, to)) {
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
