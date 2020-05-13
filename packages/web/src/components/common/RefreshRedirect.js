import React from 'react';
import { string } from 'prop-types';
import { Redirect } from 'react-router-dom';

import { isBrowser } from 'sly/web/config';

const RefreshRedirect = ({ to }) => {
  if (isBrowser) {
    window.location.href = to;
    return null;
  }

  return <Redirect to={to} />;
};

RefreshRedirect.propTypes = {
  to: string,
};

export default RefreshRedirect;
