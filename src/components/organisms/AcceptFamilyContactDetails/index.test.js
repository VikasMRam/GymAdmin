import React from 'react';
import { shallow } from 'enzyme';

import AcceptFamilyContactDetails from 'sly/components/organisms/AcceptFamilyContactDetails';

const label = 'test label';
const detail = {
  type: 'email',
  value: 'test@test.com',
};
const defaultProps = {
  label,
  detail,
};
const wrap = (props = {}) => shallow(<AcceptFamilyContactDetails {...defaultProps} {...props} />);

describe('AcceptFamilyContactDetails', () => {
  it('renders', () => {
    const wrapper = wrap();
    const id = wrapper.find('InteractiveDetail');

    expect(id).toHaveLength(1);
    expect(id.prop('label')).toBe(label);
    expect(id.prop('detail')).toEqual(detail);
  });
});
