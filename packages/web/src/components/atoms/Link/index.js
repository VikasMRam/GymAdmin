import React, { Component } from 'react';
import styled from 'styled-components';
import { Link as RRLink } from 'react-router-dom';
import { string, bool, object } from 'prop-types';
import { ifNotProp } from 'styled-tools';

import { palette } from 'sly/web/components/themes';
import { palette as palettePropType } from 'sly/web/propTypes/palette';
import { routes as routesPropType } from 'sly/web/propTypes/routes';
import { variation as variationPropType } from 'sly/web/propTypes/variation';
import isPathInRoutes from 'sly/web/services/helpers/isPathInRoutes';
import { addEventToUrl } from 'sly/web/services/helpers/queryParamEvents';
import { withColor, withText, withSpacing, withDisplay, withBorder, withZIndex } from 'sly/web/components/helpers';

// eslint-disable-next-line jsx-a11y/anchor-has-content
export const Anchor = styled.a`
  ${withDisplay}
  ${withSpacing}
  ${withText}
  ${withBorder}
  ${withZIndex}
  
  &, &:active {
    ${withColor} 
  }
  
  text-decoration: none;

  &:hover {
    color: ${ifNotProp('noHoverColorChange', palette('filler'))};
    cursor: pointer;
  }

 
  &:focus {
    outline: none;
  }
`;

export default class Link extends Component {
  static propTypes = {
    to: string,
    href: string,
    palette: palettePropType,
    variation: variationPropType,
    noHoverColorChange: bool,
    event: object,
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
      return <RRLink {...props} component={Anchor} to={addEventToUrl(props.to, props.event)} />;
    }
    const target = props.href && props.href.match(/https?:\/\//)
      ? { target: '_blank', rel: 'noopener' }
      : {};
    return <Anchor {...target} {...props} href={addEventToUrl(props.href, props.event)} />;
  }
}
