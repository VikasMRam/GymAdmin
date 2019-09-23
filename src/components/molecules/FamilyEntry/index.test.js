import React from 'react';
import { shallow } from 'enzyme';

import FamilyEntry from 'sly/components/molecules/FamilyEntry';
import PraneshKumar from 'sly/../private/storybook/sample-data/client-pranesh-kumar.json';

const defaultProps = {
  client: PraneshKumar,
};
const wrap = (props = {}) => shallow(<FamilyEntry {...defaultProps} {...props} />);

describe('FamilyEntry', () => {
  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.contains(PraneshKumar.clientInfo.name)).toBeTruthy();
    expect(wrapper.find('IconBadge')).toHaveLength(1);
    expect(wrapper.find('Stage')).toHaveLength(1);
  });
});
