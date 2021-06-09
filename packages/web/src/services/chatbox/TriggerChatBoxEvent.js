import  React, { useContext } from 'react';

import { chatBotContext } from './chatbotContext';

const TriggerChatBoxEvent = (props) => {
  const ctx  = useContext(chatBotContext);
  const { eventName } = props;
  ctx.triggerChatBot(eventName);
  return (
    <>
    </>
  );
};

export default TriggerChatBoxEvent;
