import React from 'react';
import { Field } from 'redux-form';

import ReduxField from 'sly/common/components/organisms/ReduxField';

export default function EditField(props) {
  return (
    <Field
      wideWidth
      {...props}
      component={ReduxField}
    />
  );
}
