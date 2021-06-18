import React, { useContext, useState, useRef, useEffect, useCallback } from 'react';
import Helmet from 'react-helmet';
import { useLocation } from 'react-router-dom';

import ChatBoxGlobalStyle from './ChatBoxGlobalStyle';

import { /* isBrowser, olarkSiteId, */ rokoApiKey, hideChatbox } from 'sly/web/config';


export const ChatBoxContext = React.createContext({ triggerChatBot: () => {} });

const loadJsScript = () => {
  return new Promise((resolve, reject) => {
    if (typeof window !== 'undefined') {
      let script = document.getElementById('instabot');
      if (!script) {
        script = document.createElement('script');
        script.src = 'https://widget.instabot.io/jsapi/rokoInstabot.js';
        script.id = 'instabot';
        script.type = 'text/javascript';
        script.text = `apiKey:"${rokoApiKey}"`;
        script.async = true;
        script.crossOrigin = '';
        document.body.appendChild(script);
      }
      script.onload = () => {
        resolve(window.RokoInstabot);
      };
      script.onerror = (err) => {
        reject(err);
      };
    } else {
      reject(new Error('Roko Instabot can\'t be loaded in the server'));
    }
  });
};

const getTimeoutForEvent = (eventName) => {
  if (eventName === 'Bot reintro') {
    return 30000;
  }
  return 10000; // default timeout
};


export const ChatBoxProvider = (props) => {
  const [isChatboxLoaded, setChatboxLoaded] = useState(false);
  const location = useLocation();
  const currentTimer = useRef(0);
  const currentEvent = useRef(0);

  const canEventTrigger = (location, eventName) => {
    if (eventName === 'Bot reintro') {
      if (location.pathname.indexOf('wizard') !== -1) {
        return false;
      } else if (location.pathname.indexOf('resources') !== -1) {
        return false;
      } else if (location.pathname.indexOf('seniorly.com/dashboard') !== -1) {
        return false;
      } else if (location.pathname.indexOf('veterans-benefit') !== -1) {
        return false;
      } else if (location.pathname.indexOf('in-home-care') !== -1) {
        return false;
      } else if (location.pathname.indexOf('respite-care') !== -1) {
        return false;
      } else if (location.pathname.indexOf('nursing-homes') !== -1) {
        return false;
      } else if (location.pathname.indexOf('active-adult') !== -1) {
        return false;
      }
      return true;
    }
    return false;
  };

  const clearCurrentTimeOut = useCallback(
    () => {
      if (currentTimer.current) {
        console.log('clearing');
        clearTimeout(currentTimer.current);
        currentTimer.current = null;
      }
    },
    [currentTimer.current],
  );


  useEffect(() => {
    console.log('2');
    if (!canEventTrigger(location, currentEvent.current)) {
      clearCurrentTimeOut();
    }
  }, [location]);


  const triggerEvent = useCallback(
    (eventName) => {
      if (hideChatbox) {
        return;
      }
      currentEvent.current = eventName;
      console.log('1');
      clearCurrentTimeOut();
      currentTimer.current = setTimeout(() => {
        loadJsScript()
          .then((instance) => {
            instance.trigger(eventName);
            clearCurrentTimeOut();
            if (!isChatboxLoaded) {
              setChatboxLoaded(true);
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }, getTimeoutForEvent(eventName));
    },
    [currentTimer.current],
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

