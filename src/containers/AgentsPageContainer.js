import React from 'react';
import { func, object, arrayOf } from 'prop-types';

import AgentsPage from 'sly/components/pages/AgentsPage';

const onSubmitForm = () => {

};

const AgentsPageContainer = () => (
  <AgentsPage onSubmitForm={onSubmitForm} />
);

export default AgentsPageContainer;
