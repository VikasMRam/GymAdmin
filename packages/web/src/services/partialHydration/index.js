import React, { useState, useRef, useEffect } from 'react';
import loadable from '@loadable/component';

import { isBrowser } from 'sly/web/config';

export const withHydration = (loadFn) => {
  // const Component = loadable(loadFn, { ssrOnly: true, suspense: isBrowser });
  let Component = loadable(loadFn, { ssrOnly: true });

  return (props) => {
    const ref = useRef();
    const [shouldHydrate, setShouldHydrate] = useState(false);
    useEffect(() => {
      const check = (items) => {
        items.forEach((item) => {
          if (item.isIntersecting) {
            loadFn.importAsync().then((module) => {
              Component = module.default;
              setShouldHydrate(true);
            });
          }
        });
      };
      const observer = new IntersectionObserver(check, {
        marginRoot: '0px 0px 0px 250px',
      });
      observer.observe(ref.current);
      return () => observer.disconnect();
    }, []);
    if (isBrowser) {
      if (shouldHydrate) {
        return (
          <div ref={ref}>
            <Component {...props} />
          </div>
        );
      }
      return <div ref={ref} dangerouslySetInnerHTML={{ __html: '' }} />;
    }
    // serverside
    return (
      <div ref={ref}>
        <Component {...props} />
      </div>
    );
  };
};

