import React, { Component } from 'react';
import { string, object } from 'prop-types';
import { Link as RRLink } from 'react-router-dom';

import Root from './Root';

import { palette as palettePropType } from 'sly/common/propTypes/palette';
import { variation as variationPropType } from 'sly/common/propTypes/variation';
import { createRRAnchor } from 'sly/common/components/helpers';
import { addEventToUrl } from 'sly/web/services/helpers/queryParamEvents';

const RRLinkAnchor = createRRAnchor(Root);

export default class Link extends Component {
  static propTypes = {
    to: string,
    href: string,
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
    const { to, href, event, ...props } = this.props;

    if (to && !to.match(/^https?:\/\//)) {
      return {
        ...props,
        // flip the order on which we present the components
        LinkComponent: RRLink,
        component: RRLinkAnchor,
        to: addEventToUrl(to, event),
      };
    }

    const target = href && href.match(/https?:\/\//)
      ? { target: '_blank', rel: 'noopener' }
      : {};
    return {
      LinkComponent: Root,
      ...props,
      ...target,
      href: addEventToUrl(href, event),
    };
  }

  render() {
    const { LinkComponent, ...props } = this.checkPropsForLinks();
    return <LinkComponent {...props} />;
  }
}
