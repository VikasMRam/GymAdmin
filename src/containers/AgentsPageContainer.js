import React from 'react';
import { func, object, arrayOf } from 'prop-types';

import AgentsPage from 'sly/components/pages/AgentsPage';

const handleSubmitForm = () => {
  console.log('handleSubmitForm');
};

const handleLocationSearch = (value) => {
  console.log('handleLocationSearch', value);
};

const AgentsPageContainer = () => (
  <AgentsPage onSubmitForm={handleSubmitForm} onLocationSearch={handleLocationSearch} />
);

export default AgentsPageContainer;
