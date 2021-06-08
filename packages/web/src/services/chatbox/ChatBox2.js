import  React from 'react';
import Helmet from 'react-helmet';

import ChatBoxGlobalStyle from './ChatBoxGlobalStyle';

import { /* isBrowser, olarkSiteId, */ rokoApiKey } from 'sly/web/config';


const ChatBox2 = (props) => {
  console.log('api key', rokoApiKey);
  const loadTag = (callBack) => {
    if (typeof window !== 'undefined') {
      const existingScript = document.getElementById('instabot');
      if (!existingScript) {
        console.log('correct');
        const script = document.createElement('script');
        script.src = 'https://widget.instabot.io/jsapi/rokoInstabot.js';
        script.id = 'instabot';
        script.type = 'text/javascript';
        script.text = `apiKey:"${rokoApiKey}"`;
        script.async = true;
        script.crossOrigin = '';
        console.log(script);
        document.body.appendChild(script);
        script.onload = () => {
          if (callBack) callBack();
        };
      }
      if (existingScript && callBack) callBack();
    }
  };
  return (

    <>
      <Helmet>
        <style type="text/css">{ChatBoxGlobalStyle}</style>
      </Helmet>
      {loadTag(props.triggerEvent)}
    </>
  );
};

export default ChatBox2;
