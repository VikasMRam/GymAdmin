import React, { useContext, useMemo, useState, useCallback, useEffect } from 'react';

import ChatBoxContainer from './ChatBoxContainer';
import ChatBoxContainer1 from './ChatBoxContainer1';


export const chatBotContext = React.createContext({ triggerChatBot: () => {} });

const ChatBotProvider = (props) => {
  const [currentEvent, setCurrentEvent] = useState();
  const triggerChatBot1 = (eventName) => {
    console.log(eventName);
    setCurrentEvent(eventName);
  };

  const contextValue = {
    triggerChatBot: triggerChatBot1,
  };

  return (
    <>
      {currentEvent && <ChatBoxContainer1 currentEvent={currentEvent} />}
      <chatBotContext.Provider value={contextValue} >
        {props.children}
      </chatBotContext.Provider>
    </>
  );
};


export default ChatBotProvider;
