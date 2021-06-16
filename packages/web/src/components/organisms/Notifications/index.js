import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { string, func, shape, arrayOf, oneOf } from 'prop-types';
import styled from 'styled-components';

import { key } from 'sly/common/components/themes';
import Notification from 'sly/web/components/molecules/Notification';
import { sx$laptop, space } from 'sly/common/system';

const transitionName = 'slide';

const StyledTransitionGroup = styled(TransitionGroup)`
  z-index: ${key('zIndexes.notifications')};
  position: fixed;
  bottom: 0px;
  width:100%;
  display: flex;
  flex-direction: column;

  ${sx$laptop({
    bottom: space('l'),
  })}

  .${transitionName}-enter {
    transform: translate(100%);
  }
  .${transitionName}-enter-active {
    transform: translate(0%);
    transition: transform ${key('transitions.slow.inOut')};
  }
  .${transitionName}-exit {
    transform: translate(0%);
  }
  .${transitionName}-exit-active {
    transform: translate(100%);
    transition: transform ${key('transitions.slow.inOut')};
  }

  > * {
    align-self: flex-end;
    margin-bottom: ${space('xs')};
  }

  > *:last-child {
    margin-bottom: 0;
  }
`;

const Notifications = ({ messages, dismiss }) => {
  const notificationComponents = messages.map(({
    type, content, id,
  }) => (
    <CSSTransition
      key={content}
      timeout={500}
      classNames={transitionName}
    >
      <Notification
        isOpen
        type={type}
        onClose={() => dismiss(id)}
      >
        {content}
      </Notification>
    </CSSTransition>
  ));

  return (
    <StyledTransitionGroup>
      {notificationComponents}
    </StyledTransitionGroup>
  );
};

Notifications.propTypes = {
  messages: arrayOf(shape({
    content: string,
    type: oneOf(['default', 'error']),
  })),
  dismiss: func,
};

export default Notifications;
