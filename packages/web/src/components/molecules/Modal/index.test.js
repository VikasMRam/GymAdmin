import React from 'react';
import { shallow } from 'enzyme';

import Modal from 'sly/components/molecules/Modal';

const onClose = jest.fn();
const wrap = (props = {}) => shallow(<Modal onClose={onClose} {...props} />);

// todo: add tests that's useful
describe('Modal', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(true);
  });

  it('renders props when passed in', () => {
    const wrapper = wrap({ htmlFor: 'foo' });
    expect(wrapper.find({ htmlFor: 'foo' })).toHaveLength(1);
  });

  it('renders close button when closeable is passed in', () => {
    const wrapper = wrap({ closeable: true });
    expect(wrapper.find({ onClick: onClose })).toHaveLength(1);
  });
});
