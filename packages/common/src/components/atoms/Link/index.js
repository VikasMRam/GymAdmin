import React, { Component } from 'react';
import { string, object, func } from 'prop-types';
import { Link as RRLink } from 'react-router-dom';

import Root from './Root';

import events from 'sly/web/services/events';
import { palette as palettePropType } from 'sly/common/propTypes/palette';
import { variation as variationPropType } from 'sly/common/propTypes/variation';
import { createRRAnchor } from 'sly/common/components/helpers';

const RRLinkAnchor = createRRAnchor(Root);

export default class Link extends Component {
  static propTypes = {
    to: string,
    href: string,
    onClick: func,
    palette: palettePropType,
    variation: variationPropType,
    event: object,
  };

  static defaultProps = {
    palette: 'primary',
    variation: 'base',
    textDecoration: 'none',
    cursor: 'pointer',
  };

  static displayName = 'Link';

  checkPropsForLinks() {
    const { to, href, event, onClick: onClickProp, ...props } = this.props;

    const onClick = (...args) => {
      if (event) {
        events.track(event);
      }
      if (onClickProp) {
        return onClickProp(...args);
      }
      return null;
    };

    if (to && !to.match(/^https?:\/\//)) {
      return {
        ...props,
        // flip the order on which we present the components
        LinkComponent: RRLink,
        component: RRLinkAnchor,
        onClick,
        to,
      };
    }

    const target = href && href.match(/https?:\/\//)
      ? { target: '_blank', rel: 'noopener' }
      : {};
    return {
      LinkComponent: Root,
      ...props,
      ...target,
      onClick,
      href,
    };
  }

  render() {
    const { LinkComponent, ...props } = this.checkPropsForLinks();
    return <LinkComponent {...props} />;
  }
}
