import React from 'react';
import { func } from 'prop-types';

import { isModifiedEvent } from './helper';

export const createRRAnchor = (Anchor) => {
  const RRLinkAnchor = React.forwardRef(({ navigate, onPress, ...rest }, ref) => {
    const { target } = rest;

    const props = {
      ...rest,
      onPress: (event) => {
        try {
          if (onPress) onPress(event);
        } catch (ex) {
          event.preventDefault();
          throw ex;
        }

        if (
          !event.defaultPrevented && // onPress prevented default
          event.button === 0 && // ignore everything but left clicks
          (!target || target === '_self') && // let browser handle "target=_blank" etc.
          !isModifiedEvent(event) // ignore clicks with modifier keys
        ) {
          event.preventDefault();
          navigate();
        }
      },
    };

    return <Anchor ref={ref} {...props} />;
  });

  RRLinkAnchor.propTypes = {
    navigate: func,
    onPress: func,
  };

  return RRLinkAnchor;
};
