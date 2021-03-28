import React from 'react';
import { object } from 'prop-types';

import App from 'sly/web/components/App';
import { ApiContext } from 'sly/web/services/api/context';
import { IconContext } from 'sly/common/system/Icon';

export default function ClientApp({ apiContext, icons }) {
  apiContext.promises = [];
  apiContext.skipApiCalls = false;

  return (
    <IconContext.Provider value={icons} >
      <ApiContext.Provider value={apiContext}>
        <App />
      </ApiContext.Provider>
    </IconContext.Provider>
  );
}

ClientApp.propTypes = {
  apiContext: object,
};
