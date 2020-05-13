import React from 'react';
import { shallow } from 'enzyme';
import { Field } from 'redux-form';

import DashboardChangePasswordForm from 'sly/web/components/organisms/DashboardChangePasswordForm';

const handleSubmit = jest.fn();
const wrap = (props = {}) => shallow(<DashboardChangePasswordForm handleSubmit={handleSubmit} {...props} />);

describe('DashboardChangePasswordForm', () => {
  it('render DashboardChangePasswordForm', () => {
    const wrapper = wrap({ });
    expect(wrapper.find(Field).filter({ name: 'oldPassword' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'newPassword' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'confirmPassword' })).toHaveLength(1);
    expect(wrapper.find('FormSection')).toHaveLength(1);
  });
});
