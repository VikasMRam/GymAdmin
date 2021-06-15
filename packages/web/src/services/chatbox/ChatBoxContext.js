import React, { useContext, useState, useRef, useEffect } from 'react';
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
  console.log(location);
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


export const ChatBoxProvider = (props) => {
  const [isChatboxLoaded, setChatboxLoaded] = useState(false);

  const location = useLocation();
  const currentTimer = useRef(0);
  const currentEvent = useRef(0);


  const tc = (eventName) => {
    if (canEventTrigger(location, eventName)) {
      if (typeof window !== 'undefined' && window.RokoInstabot) {
        console.log('triggering vikas', eventName);
        window.RokoInstabot.trigger(eventName);
        currentTimer.current = null;
      } else {
        // console.log('re nav');
      }
    }
  };

  useEffect(() => {
    if (currentTimer.current) {
      if (!canEventTrigger(location, currentEvent.current)) {
        clearTimeout(currentTimer.current);
        currentTimer.current = null;
      }
    }
  }, [location]);


  const triggerChatBotEvent = (eventName) => {
    console.log('Event : ', eventName);
    currentTimer.current = null;
    if (eventName === 'Bot reintro') {
      currentTimer.current = setTimeout(() => {
        tc(eventName);
      }, 30000);
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
