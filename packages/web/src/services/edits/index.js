import React from 'react';
import get from 'lodash/get';
import set from 'lodash/set';

export const EditContext = React.createContext({});

export function patchFormInitialValues(initialValues, currentEdit) {
  Object.entries(currentEdit?.changes || {}).forEach(([key, change]) => {
    set(initialValues, key, get(currentEdit.change, key));
  });
}
