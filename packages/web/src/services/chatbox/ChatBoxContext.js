import React, { useContext, useMemo, useState, useRef, useCallback, useEffect } from 'react';
import Helmet from 'react-helmet';
import { useLocation } from 'react-router-dom';

import ChatBoxGlobalStyle from './ChatBoxGlobalStyle';

import { /* isBrowser, olarkSiteId, */ rokoApiKey } from 'sly/web/config';


export const ChatBoxContext = React.createContext({ triggerChatBot: () => {} });

const loadJsScript = () => {
  return new Promise((resolve, reject) => {
    if (typeof window !== 'undefined') {
      const existingScript = document.getElementById('instabot');
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://widget.instabot.io/jsapi/rokoInstabot.js';
        script.id = 'instabot';
        script.type = 'text/javascript';
        script.text = `apiKey:"${rokoApiKey}"`;
        script.async = true;
        script.crossOrigin = '';
        document.body.appendChild(script);
        script.onload = () => {
          resolve(true);
        };
        script.onerror = (err) => {
          console.log(err);
          reject(new Error());
        };
      }
      if (existingScript) resolve(true);
    } else {
      reject(new Error());
    }
  });
};

const canEventTrigger = (location, eventName) => {
  if (eventName === 'Test Trigger 1') {
    if (location.pathname.indexOf('assisted-living') >= 0) {
      return true;
    }
    return false;
  } else if (eventName === 'Test Trigger 2') {
    return true;
  }
};


export const ChatBoxProvider = (props) => {
  // const [currentEvent, setCurrentEvent] = useState();
  const [isChatboxLoaded, setChatboxLoaded] = useState(false);

  const location = useLocation();
  const currentTimer = useRef(0);
  const currentEvent = useRef(0);


  const tc = (eventName) => {
    console.log(location);
    if (canEventTrigger(location, eventName)) {
      if (typeof window !== 'undefined' && window.RokoInstabot) {
        console.log('ttriggering vikas', eventName);
        window.RokoInstabot.trigger(eventName);
        currentTimer.current = null;
      } else {
        console.log('re nav');
      }
    }
  };

  useEffect(() => {
    console.log(location);
    if (currentTimer.current) {
      if (!canEventTrigger(location, currentEvent.current)) {
        clearTimeout(currentTimer.current);
        console.log('clearing');
        currentTimer.current = null;
      }
    }
  }, [location]);


  const triggerChatBotEvent = (eventName) => {
    currentTimer.current = null;
    if (eventName === 'Test Trigger 1') {
      console.log('set TimeOut');
      currentTimer.current = setTimeout(() => {
        tc(eventName);
      }, 10000);
    } else if (eventName === 'Test Trigger 2') {
      tc(eventName);
    }
  };

  const triggerEvent = (eventName) => {
    if (!isChatboxLoaded) {
      loadJsScript().then(() => {
        if (!isChatboxLoaded) {
          setChatboxLoaded(true);
        }
        triggerChatBotEvent(eventName);
      });
    } else {
      triggerChatBotEvent(eventName);
    }
  };


  const contextValue = {
    triggerChatBot: triggerEvent,
  };

  return (
    <>
      <ChatBoxContext.Provider value={contextValue}>
        {isChatboxLoaded && (
          <Helmet>
            <style type="text/css">{ChatBoxGlobalStyle}</style>
          </Helmet>
     )}
        {props.children}
      </ChatBoxContext.Provider>

    </>
  );
};

export const useChatbox = () => {
  return useContext(ChatBoxContext);
};


export default ChatBoxProvider;
