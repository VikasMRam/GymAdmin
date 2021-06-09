import  React from 'react';
import Helmet from 'react-helmet';

import ChatBoxGlobalStyle from './ChatBoxGlobalStyle';

import { /* isBrowser, olarkSiteId, */ rokoApiKey } from 'sly/web/config';


const LoadChatBox = (props) => {
  const loadTag = (callBack) => {
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

// LoadChatBox.propTypes={

// };

export default LoadChatBox;
