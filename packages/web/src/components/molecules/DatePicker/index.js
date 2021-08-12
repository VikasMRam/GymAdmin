import React, { forwardRef } from 'react';
import Helmet from 'react-helmet';
import ReactDatePicker from 'react-datepicker';

import DatepickerStyles from 'sly/web/components/themes/DatepickerStyles';
import Calandar from 'sly/common/icons/Calendar';
import { Block } from 'sly/common/system';


const DatePicker = forwardRef((props, ref) => (
  <>
    <Helmet>
      <style type="text/css">{DatepickerStyles}</style>
    </Helmet>
    <Block
      display="flex"
      border="box"
      sx={{
        borderColor: 'slate.lighter-90',
      }}
    >
      <Block
        sx={{
          padding: '0 0 0 m',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Calandar size="s" color="viridian.base" />
      </Block>
      <ReactDatePicker ref={ref} {...props} />
    </Block>
  </>
));

export default DatePicker;
