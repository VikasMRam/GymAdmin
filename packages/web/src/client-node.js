import React from 'react';
import { object } from 'prop-types';

import { ApiContext } from 'sly/web/services/api/context';
import App from 'sly/web/components/App';

export default function ClientApp({ apiContext }) {
  apiContext.promises = [];
  apiContext.skipApiCalls = false;

  return (
    <ApiContext.Provider value={apiContext}>
      <App />
    </ApiContext.Provider>
  );
}

ClientApp.propTypes = {
  apiContext: object,
};
