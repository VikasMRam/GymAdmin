import React, { Fragment } from 'react';
import { object } from 'prop-types';

const Step6 = ({ data }) => (
  <Fragment>
    {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
    step 6 {data.searchResultCount}
  </Fragment>
);

Step6.propTypes = {
  data: object,
};

Step6.defaultProps = {
  data: {},
};

export default Step6;
