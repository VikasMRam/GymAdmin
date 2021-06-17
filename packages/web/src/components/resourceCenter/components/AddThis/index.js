import React, { useEffect } from 'react';


import { isBrowser } from 'sly/web/config';

const AddThis = () => {
  const loadScript = () => {
    if (!window.addThis) {
      setTimeout(() => {
        (function (s, d, r) {
          const f = d.getElementsByTagName(s)[0]; const j = d.createElement(s);
          j.defer = true; j.src = r;
          f.parentNode.insertBefore(j, f);
        }('script', document, '//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5542ad2748437167'));
      }, 10000);
    }
  };

  useEffect(() => {
    isBrowser && window.addthis?.layers?.refresh?.();
    loadScript();
  }, []);


  return (
    <div className="addthis_sharing_toolbox" />
  );
};

export default AddThis;

