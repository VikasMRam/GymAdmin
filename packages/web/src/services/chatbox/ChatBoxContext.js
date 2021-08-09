import React, { useContext, useState, useRef, useCallback } from 'react';
import Helmet from 'react-helmet';
import { useLocation } from 'react-router-dom';

import ChatBoxGlobalStyle from './ChatBoxGlobalStyle';

import { /* isBrowser, olarkSiteId, */ rokoApiKey, hideChatbox, isProd } from 'sly/web/config';


export const ChatBoxContext = React.createContext({ triggerChatBot: () => {}, setDisableChatBot: (e) => {} });

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
  } else if (eventName === 'ccrc-profile') {
    return 30000;
  }  else if (eventName === 'user-intent') {
    return 30000;
  }  else if (eventName === 'search-bot') {
    return 30000;
  }  else if (eventName === 'home-bot') {
    return 30000;
  }  else if (eventName === 'direct-market-2') {
    return 30000;
  } else if (eventName === 'direct-market-1') {
    return 30000;
  } else if (eventName === 'e2e-chat-bot') {
    return 10000;
  }
  return 10000; // default timeout
};


export const ChatBoxProvider = (props) => {
  const [isChatboxLoaded, setChatboxLoaded] = useState(false);
  const location = useLocation();
  const currentTimer = useRef(0);

  const clearCurrentTimeOut = useCallback(
    () => {
      if (currentTimer.current) {
        clearTimeout(currentTimer.current);
        currentTimer.current = null;
      }
    },
    [currentTimer.current],
  );

  let disableChatBot = false;
  const setDisableChatBot = (value) => {
    disableChatBot = value;
    console.log('disabled', disableChatBot);
  };

  const triggerEvent = useCallback(
    (eventName) => {
      console.log('eventName', eventName);

      if (!isProd) {
        eventName = 'e2e-chat-bot';
      }

      if (hideChatbox || disableChatBot) {
        return;
      }
      clearCurrentTimeOut();
      currentTimer.current = setTimeout(() => {
        if (location.pathname !== window.location.pathname) {
          return;
        }
        loadJsScript()
          .then((instance) => {
            if (hideChatbox || disableChatBot) {
              return;
            }
            console.log('Triggering Chat event name : ', eventName);
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
    [currentTimer.current, location.pathname, disableChatBot],
  );


  const contextValue = {
    triggerChatBot: triggerEvent,
    setDisableChatBot,
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

