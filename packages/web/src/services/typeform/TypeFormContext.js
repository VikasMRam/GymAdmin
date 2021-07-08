import React, { useContext, useState, useRef, useCallback } from 'react';
import Helmet from 'react-helmet';
import { useLocation } from 'react-router-dom';

export const TypeformContext = React.createContext({ triggerTypeform: () => {} });

const loadJsScript = () => {
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


  const contextValue = {
    triggerTypeform: triggerEvent,
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

