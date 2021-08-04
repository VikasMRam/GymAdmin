import React, { useCallback, useMemo } from 'react';
import { string, object, func } from 'prop-types';
import { Link as RRLink } from 'react-router-dom';

import events from 'sly/web/services/events';
import Block from 'sly/common/system/Block';
import { createRRAnchor } from 'sly/common/components/helpers';

const RRLinkAnchor = createRRAnchor(Block);

const Link = ({ to, href: hrefprop, event: rawEvent, onClick: onClickProp, ...props }) => {
  const jsonEvent = rawEvent && JSON.stringify(rawEvent);
  const event = useMemo(() => jsonEvent && JSON.parse(jsonEvent), [jsonEvent]);

  const onClick = useCallback((...args) => {
    if (event) {
      events.track(event);
    }
    if (onClickProp) {
      return onClickProp(...args);
    }
    return null;
  }, [onClickProp, event]);

  const { LinkComponent, ...linkprops } = useMemo(() => {
    if (to && !to.match(/\/\//)) {
      return {
        // flip the order on which we present the components
        LinkComponent: RRLink,
        component: RRLinkAnchor,
        to,
      };
    }

    const href = to || hrefprop;
    const target = href && href.match(/\/\//)
      ? { target: '_blank', rel: 'noopener' }
      : {};

    return {
      LinkComponent: Block,
      ...target,
      href,
    };
  }, [to, hrefprop]);

  return (
    <LinkComponent
      as="a"
      color="viridian.base"
      _sx={{
        '&:hover': {
          textDecoration: 'underline',
          cursor: 'pointer',
        },
      }}
      onClick={onClick}
      {...linkprops}
      {...props}
    />
  );
};

Link.propTypes = {
  to: string,
  href: string,
  onClick: func,
  event: object,
};

Link.defaultProps = {
  textDecoration: 'none',
  cursor: 'pointer',
};

Link.displayName = 'Link';

export default Link;

