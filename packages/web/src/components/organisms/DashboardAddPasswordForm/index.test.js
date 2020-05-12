import React from 'react';
import { shallow } from 'enzyme';
import { Field } from 'redux-form';

import DashboardAddPasswordForm from 'sly/components/organisms/DashboardAddPasswordForm';

const handleSubmit = jest.fn();
const wrap = (props = {}) => shallow(<DashboardAddPasswordForm handleSubmit={handleSubmit} {...props} />);

describe('DashboardAddPasswordForm', () => {
  it('render DashboardAddPasswordForm', () => {
    const wrapper = wrap({ });
    expect(wrapper.find(Field).filter({ name: 'newPassword' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'confirmPassword' })).toHaveLength(1);
    expect(wrapper.find('FormSection')).toHaveLength(1);
  });

  it('render Create Password Warning', () => {
    const wrapper = wrap({ pristine: true });
    expect(wrapper.find(Field).filter({ name: 'newPassword' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'confirmPassword' })).toHaveLength(1);
    expect(wrapper.find('FormSection')).toHaveLength(1);
  });
});
