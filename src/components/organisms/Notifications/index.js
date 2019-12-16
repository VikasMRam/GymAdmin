import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { string, func, shape, arrayOf, oneOf } from 'prop-types';
import styled from 'styled-components';

import { size, key } from 'sly/components/themes';
import Notification from 'sly/components/molecules/Notification';

const transitionName = 'slide';


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

  return notificationComponents;
};

Notifications.propTypes = {
  messages: arrayOf(shape({
    content: string,
    type: oneOf(['default', 'error']),
  })),
  dismiss: func,
};

export default Notifications;
