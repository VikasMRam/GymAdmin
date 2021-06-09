import React, { Component, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import LoadChatBox from './LoadChatBox';

import { ENABLED_ROUTES } from 'sly/web/constants/chatbox';


const ChatBoxContainer1 = (props) => {
  const { currentEvent } = props;
  const [footerReached, setFooterReached] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const location = useLocation();
  useEffect(
    () => {
      console.log('url changes');
      console.log(location);
    },
    [location],
  );


  const handleScroll = () => {
    const isFooterReached = (window.innerHeight + window.pageYOffset) >= (document.body.offsetHeight - 60);
    console.log('scroll', isFooterReached);
    // Important: don't trigger rerender unnecessarily
    if (isFooterReached !== footerReached) {
      setFooterReached(isFooterReached);
    }
  };
  useEffect(() => {
    console.log('footer', footerReached);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    console.log('footer', footerReached);
    if (footerReached) {
      document.body.classList.add('ChatBox-footer-reached');
    }
    // if (pageWithStickyFooter) {
    //   document.body.classList.add('ChatBox-page-with-sticky-footer');
    // }
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    console.log('footer-reached', footerReached);
    if (footerReached) {
      document.body.classList.add('ChatBox-footer-reached');
    } else {
      document.body.classList.remove('ChatBox-footer-reached');
    }
  }, [footerReached]);

  const triggerEvent = () => {
    setIsScriptLoaded(true);
    console.log('triggering', currentEvent);
    if (window.RokoInstabot) {
      window.RokoInstabot.trigger(currentEvent);
    }
  };

  return (
    <>
      {(!isScriptLoaded) && <LoadChatBox triggerEvent={triggerEvent} />}
    </>
  );
};

export default ChatBoxContainer1;

