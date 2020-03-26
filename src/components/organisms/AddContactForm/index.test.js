import React from 'react';
import { shallow } from 'enzyme';

import AddContactForm from './index';

const defaultValues = {
  handleSubmit: jest.fn(),
  onCancel: jest.fn(),
  heading: 'Update a contact',
};
const wrap = (props = {}) => shallow(<AddContactForm {...defaultValues} {...props} />);

describe('AddContactForm', () => {
  it('renders', () => {
    const wrapper = wrap({
      initialValues: {
        name: 'Frank Grimes',
        email: 'frang.grimes@snpp.biz',
        mobilePhone: '8768768765',
        entity: { name: 'Springfield Retirement Castle' },
      },
    });

    expect(wrapper.find('Field').find({ name: 'name' })).toHaveLength(1);
    expect(wrapper.find('Field').find({ name: 'email' })).toHaveLength(1);
    expect(wrapper.find('Field').find({ name: 'mobilePhone' })).toHaveLength(1);
    expect(wrapper.find('Field').find({ name: 'entity.name' })).toHaveLength(1);
  });
});
