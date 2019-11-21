import React from 'react';
import { shallow } from 'enzyme';

import DuplicateFamilies from 'sly/components/organisms/DuplicateFamilies';
import clients from 'sly/../private/storybook/sample-data/clients.json';

const wrap = (props = {}) => shallow(<DuplicateFamilies {...props} />);

describe('DuplicateFamilies', () => {
  it('renders', () => {
    const wrapper = wrap({ clients, currentClient: clients[0] });

    expect(wrapper.find('FamilyEntry')).toHaveLength(clients.length);
  });
});
