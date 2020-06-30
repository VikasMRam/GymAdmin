import React, { useContext } from 'react';
import { Field } from 'redux-form';
import get from 'lodash/get';
import { string } from 'prop-types';
import diff from 'deep-diff';

import HelpBubble from 'sly/web/components/form/HelpBubble';
import ReduxField from 'sly/web/components/organisms/ReduxField';
import { EditContext } from 'sly/web/services/edits';
import { commaAnd } from 'sly/web/services/helpers/strings';

const formatChange = (change) => {
  if (typeof change === 'string') {
    return change;
  } else if (Array.isArray(change)) {
    return commaAnd(change) || 'empty';
  }
  if (change === null || typeof change === 'undefined') {
    return 'blank';
  }
  return JSON.stringify(change);
};

const getChange = (editChange, props = {}) => {
  const change = get(editChange, props.name);
  if (props.options && !change) return [];
  if (props.options && Array.isArray(change)) {
    return props.options
      .map(({ value }) => value)
      .filter(value => (change || []).indexOf(value) !== -1);
  }
  return change;
};

function Bubble(props) {
  const currentEdit = useContext(EditContext);

  if (!currentEdit) {
    return null;
  }

  const preChange = getChange(currentEdit.preChange, props);
  const change = getChange(currentEdit.change, props);
  const bubble = diff(preChange || {}, change || {})
    ? <HelpBubble>Was {formatChange(preChange, props)}</HelpBubble>
    : null;

  return bubble;
}

export default function EditField(props) {
  return (
    <>
      <Bubble {...props} />
      <Field
        {...props}
        wideWidth
        component={ReduxField}
      />
    </>
  );
}

EditField.propTypes = {
  name: string,
};
