import React from 'react';
import { func } from 'prop-types';

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

export const createRRAnchor = (Anchor) => {
  const RRLinkAnchor = React.forwardRef(({ navigate, onClick, ...rest }, ref) => {
    const { target } = rest;

    const props = {
      ...rest,
      onClick: (event) => {
        try {
          if (onClick) onClick(event);
        } catch (ex) {
          event.preventDefault();
          throw ex;
        }

        if (
          !event.defaultPrevented && // onClick prevented default
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
    onClick: func,
  };

  return RRLinkAnchor;
};

