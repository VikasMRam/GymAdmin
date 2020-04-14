import React from 'react';
import { func, object, string, bool } from 'prop-types';

import Button from 'sly/components/atoms/Button';
import Field from 'sly/components/molecules/Field';
import ReduxField from 'sly/components/organisms/ReduxField';
import userPropType from 'sly/propTypes/user';

export default function EmailSharePageForm({ formName, invalid, submitting, handleSubmit, user }) {
  return (
    <form name={formName} onSubmit={handleSubmit}>
      <Field type="text" name="to.name" label="Your friend's name" component={ReduxField} />
      <Field type="email" name="to.email" label="Your friend's email address" component={ReduxField} />
      <Field type="text" name="from.name" label="Your name" component={ReduxField} />
      <Field type="email" name="from.email" label="Your email address" component={ReduxField} />
      <Button type="submit" disabled={invalid || submitting}>
        Save changes
      </Button>
    </form>
  );
}

EmailSharePageForm.propTypes = {
  user: userPropType,
  form: string.isRequired,
  submitting: bool,
  invalid: bool,
  handleSubmit: func.isRequired,
};

