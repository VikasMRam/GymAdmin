import React, { useEffect } from 'react';
import Helmet from 'react-helmet';

import { isBrowser } from 'sly/web/config';

const AddThis = () => {
  useEffect(() => {
    isBrowser && window.addthis?.layers?.refresh();
  }, []);

  return (
    <>
      <div className="addthis_sharing_toolbox" />

      <Helmet>
        {isBrowser && !window.addThis && (
          <script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5542ad2748437167" />
        )}
      </Helmet>
    </>
  );
};

export default AddThis;
