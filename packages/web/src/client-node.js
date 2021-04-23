import React from 'react';
import { object } from 'prop-types';

import App from 'sly/web/components/App';
import { ApiProvider } from 'sly/web/services/api';
import { IconContext } from 'sly/common/system/Icon';

export default function ClientApp({ apiContext, iconsContext }) {
  return (
    <IconContext.Provider value={iconsContext} >
      <ApiProvider value={apiContext}>
        <App />
      </ApiProvider>
    </IconContext.Provider>
  );
}

ClientApp.propTypes = {
  apiContext: object,
  iconsContext: object,
};
