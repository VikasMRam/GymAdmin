import React from 'react';
import { shallow } from 'enzyme';

import AcceptAndContactFamilyForm from 'sly/web/components/organisms/AcceptAndContactFamilyForm';

const defaultProps = {
  contactTypes: ['email', 'phone', 'message'],
};

const wrap = (props = {}) => shallow(<AcceptAndContactFamilyForm {...defaultProps} {...props} />);

describe('AcceptAndContactFamilyForm', () => {
  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('ThreeSectionFormTemplate')).toHaveLength(1);
  });

  it('click on phone is called with correct data', () => {
    const handleSubmit = jest.fn();
    const wrapper = wrap({ handleSubmit });

    wrapper.find('ThreeSectionFormTemplate').find('[icon="phone"]').simulate('click');
    wrapper.find('ThreeSectionFormTemplate').dive().find('form').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });

  it('click on email is called with correct data', () => {
    const handleSubmit = jest.fn();
    const wrapper = wrap({ handleSubmit });

    wrapper.find('ThreeSectionFormTemplate').find('[icon="email"]').simulate('click');
    wrapper.find('ThreeSectionFormTemplate').dive().find('form').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });

  it('click on message is called with correct data', () => {
    const handleSubmit = jest.fn();
    const wrapper = wrap({ handleSubmit });

    wrapper.find('ThreeSectionFormTemplate').find('[icon="message"]').simulate('click');
    wrapper.find('ThreeSectionFormTemplate').dive().find('form').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });
});
