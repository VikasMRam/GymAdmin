import React, { useContext, useMemo, useState, useRef, useCallback, useEffect } from 'react';
import Helmet from 'react-helmet';
import { useLocation } from 'react-router-dom';

import ChatBoxGlobalStyle from './ChatBoxGlobalStyle';

import { /* isBrowser, olarkSiteId, */ rokoApiKey } from 'sly/web/config';


export const ChatBotContext = React.createContext({ triggerChatBot: () => {} });

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


export const ChatBotProvider = (props) => {
  // const [currentEvent, setCurrentEvent] = useState();
  const [isChatboxLoaded, setChatboxLoaded] = useState(false);

  const location = useLocation();
  const currentTimer = useRef(0);


  const tc = (eventName) => {
    console.log(location);
    if (location.pathname.indexOf('assisted-living') >= 0) {
      if (typeof window !== 'undefined' && window.RokoInstabot) {
        console.log('ttriggering vikas', eventName);
        window.RokoInstabot.trigger(eventName);
      } else {
        console.log('re nav');
      }
    }
  };

  useEffect(() => {
    console.log(location);
    if (currentTimer.current) {
      console.log('clearing');
      clearTimeout(currentTimer.current);
      currentTimer.current = null;
    }
  }, [location]);


  const triggerChatBotEvent = (eventName) => {
    if (eventName === 'Test Trigger 1') {
      console.log('set TimeOut');
      currentTimer.current = setTimeout(() => {
        tc(eventName);
      }, 10000);
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
      // triggerChatBotEvent(eventName);
    }
  };


  const contextValue = {
    triggerChatBot: triggerEvent,
  };

  return (
    <>
      <ChatBotContext.Provider value={contextValue}>
        {isChatboxLoaded && (
          <Helmet>
            <style type="text/css">{ChatBoxGlobalStyle}</style>
          </Helmet>
     )}
        {props.children}
      </ChatBotContext.Provider>

    </>
  );
};

export const useChatbox = () => {
  return useContext(ChatBotContext);
};


export default ChatBotProvider;
