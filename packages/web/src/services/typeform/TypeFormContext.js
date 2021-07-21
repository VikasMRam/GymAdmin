import React, { useContext, useState, useRef, useCallback } from 'react';
import Helmet from 'react-helmet';
import { useLocation } from 'react-router-dom';

export const TypeformContext = React.createContext({ getTypeFormUrlByCommunity: () => {}, getEmbededFormUrl: () => {} });

const loadJsScript = () => {
  return;
  return new Promise((resolve, reject) => {
    if (typeof window !== 'undefined') {
      let script = document.getElementById('typef_orm');
      if (!script) {
        script = document.createElement('script');
        script.src = 'https://embed.typeform.com/embed.js';
        script.id = 'typef_orm';
        script.type = 'text/javascript';
        script.async = true;
        document.body.appendChild(script);
      }
      script.onload = () => {
        resolve(true);
      };
      script.onerror = (err) => {
        reject(err);
      };
    } else {
      reject(new Error('Roko Instabot can\'t be loaded in the server'));
    }
  });
};


export const TypeformProvider = (props) => {
  const [isTypeFormLoaded, setIsTypeFormLoaded] = useState(false);
  const location = useLocation();

  const triggerEvent = useCallback(
    (eventName) => {
      console.log('typeform', eventName);
      loadJsScript()
        .then((instance) => {
          if (!isTypeFormLoaded) {
            setIsTypeFormLoaded(true);
          }
          console.log('resolved', instance);
          // instance.trigger(eventName);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [],
  );

  const getTypeFormUrlByCommunity = (community, path) => {
    const { address } = community;
    const { city } = address;
    console.log('community', community);
    if (path.indexOf('assisted-living') >= 0) {
      if (city === 'Chicago') {
        loadJsScript();
        return 'https://sushrama.typeform.com/to/RYBdR1jm'; // wiz 2
      }
      return 'https://sushrama.typeform.com/to/dH3EjYYx'; // wiz1
    } else if (path.indexOf('independent-living') >= 0) {
      loadJsScript();
      return 'https://sushrama.typeform.com/to/RYBdR1jm';
    }
    return '#';
  };

  const getEmbededFormUrl = (firstTime, queryParams) => {
    console.log('qq', queryParams);
    loadJsScript();
    // QueryParams
    // logged_in : true/false
    // cta : "speakExpert" -> change conversion step language
    // entry : 'home' -> adds location step
    if (firstTime) {
      return `https://form.typeform.com/to/dH3EjYYx?typeform-medium=embed-snippet#logged_in=${queryParams.logged_in}&cta=${queryParams.cta}&entry=${queryParams.entry}`; // wiz1
    }
    return 'https://form.typeform.com/to/RYBdR1jm?typeform-medium=embed-snippet'; // wiz2
  };


  const contextValue = {
    getTypeFormUrlByCommunity,
    getEmbededFormUrl,
  };

  return (
    <>
      <TypeformContext.Provider value={contextValue}>
        {props.children}
      </TypeformContext.Provider>

    </>
  );
};

export const useTypeform = () => {
  return useContext(TypeformContext);
};


export default TypeformProvider;

