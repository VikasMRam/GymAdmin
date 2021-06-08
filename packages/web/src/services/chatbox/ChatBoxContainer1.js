import React, { Component, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import ChatBox2 from './chatBox2';

import { ENABLED_ROUTES } from 'sly/web/constants/chatbox';


const ChatBoxContainer1 = (props) => {
  console.log(props);
  console.log('container1');
  const { currentEvent } = props;
  const [footerReached, setFooterReached] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const firstLoad  = true;

  const handleScroll = () => {
    const isFooterReached = (window.innerHeight + window.pageYOffset) >= (document.body.offsetHeight - 60);
    // Important: don't trigger rerender unnecessarily
    if (isFooterReached !== footerReached) {
      setFooterReached(isFooterReached);
    }
  };
  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const triggerEvent = () => {
    setIsScriptLoaded(true);
    console.log('triggering', currentEvent);
    if (window.RokoInstabot) {
      window.RokoInstabot.trigger(currentEvent);
    }
  };

  return (
    <>
      {(!isScriptLoaded) && <ChatBox2 triggerEvent={triggerEvent} />}
    </>
  );
};

export default ChatBoxContainer1;

