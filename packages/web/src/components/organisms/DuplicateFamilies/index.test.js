import React from 'react';
import { shallow } from 'enzyme';

import DuplicateFamilies from 'sly/web/components/organisms/DuplicateFamilies';
import clients from 'sly/storybook/sample-data/clients.json';

const wrap = (props = {}) => shallow(<DuplicateFamilies {...props} />);

describe('DuplicateFamilies', () => {
  it('renders', () => {
    const wrapper = wrap({ clients, currentClient: clients[0] });

    // becasue clients will include currentClient too which won't be displayed as duplicate
    expect(wrapper.find('FamilyEntry')).toHaveLength(clients.length - 1);
  });
});
