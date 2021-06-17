import React, { useContext, useState, useRef, useEffect, useCallback } from 'react';
import Helmet from 'react-helmet';
import { useLocation } from 'react-router-dom';

import ChatBoxGlobalStyle from './ChatBoxGlobalStyle';

import { /* isBrowser, olarkSiteId, */ rokoApiKey, hideChatbox } from 'sly/web/config';


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
          reject(err);
        };
      }
      if (existingScript) resolve(true);
    } else {
      reject(new Error());
    }
  });
};


export const ChatBoxProvider = (props) => {
  const [isChatboxLoaded, setChatboxLoaded] = useState(false);

  const location = useLocation();
  const currentTimer = useRef(0);


  const tc = (eventName) => {
    if (typeof window !== 'undefined' && window.RokoInstabot) {
      window.RokoInstabot.trigger(eventName);
      currentTimer.current = null;
    }
  };

  useEffect(() => {
    if (currentTimer.current) {
      clearTimeout(currentTimer.current);
      currentTimer.current = null;
    }
  }, [location]);


  const triggerChatBotEvent = (eventName) => {
    clearTimeout(currentTimer.current);
    currentTimer.current = null;
    if (eventName === 'Bot reintro') {
      currentTimer.current = setTimeout(() => {
        tc(eventName);
      }, 20000);
    }
  };

  const triggerEvent = useCallback(
    (eventName) => {
      if (hideChatbox) {
        return;
      }
      setTimeout(() => {
        loadJsScript().then(() => {
          if (!isChatboxLoaded) {
            setChatboxLoaded(true);
          }
          triggerChatBotEvent(eventName);
        }).catch((err) => {
          console.log(err);
        });
      }, 10000);
    },
    [isChatboxLoaded],
  );


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
