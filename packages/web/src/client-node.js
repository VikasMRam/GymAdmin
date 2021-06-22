import React from 'react';
import { object } from 'prop-types';

import AppWrapper from 'sly/web/components/AppWrapper';

export default function ClientApp({ apiContext, iconsContext, reduxStore }) {
  return (
    <AppWrapper
      apiContext={apiContext}
      iconsContext={iconsContext}
      reduxStore={reduxStore}
    />
  );
}

ClientApp.propTypes = {
  apiContext: object,
  iconsContext: object,
  reduxStore: object,
};
