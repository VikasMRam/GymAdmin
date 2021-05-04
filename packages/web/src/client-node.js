import React from 'react';
import { object } from 'prop-types';
import { ThemeProvider } from 'styled-components';

import App from 'sly/web/components/App';
import { ApiProvider } from 'sly/web/services/api';
import { IconContext } from 'sly/common/system/Icon';
import themeWithLegacy from 'sly/common/components/themes/themeWithLegacy';

export default function ClientApp({ apiContext, iconsContext }) {
  return (
    <ThemeProvider theme={themeWithLegacy}>
      <IconContext.Provider value={iconsContext} >
        <ApiProvider value={apiContext}>
          <App />
        </ApiProvider>
      </IconContext.Provider>
    </ThemeProvider>
  );
}

ClientApp.propTypes = {
  apiContext: object,
  iconsContext: object,
};
