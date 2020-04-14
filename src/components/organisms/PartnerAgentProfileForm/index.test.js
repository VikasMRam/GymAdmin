import React from 'react';
import { shallow } from 'enzyme';
import { Field } from 'redux-form';

import PartnerAgentProfileForm from 'sly/components/organisms/PartnerAgentProfileForm';

const handleSubmit = jest.fn();
const defaultProps = {
  handleSubmit,
  buttonText: 'Save',
};

const wrap = (props = {}) => shallow(<PartnerAgentProfileForm {...defaultProps} {...props} />);

describe('PartnerAgentProfileForm', () => {
  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find(Field).filter({ name: 'bio' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'parentCompany' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'displayName' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'cv' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'imageCaption' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'chosenReview' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'vacation' })).toHaveLength(1);

    expect(wrapper.find(Field).filter({ name: 'status' })).toHaveLength(0);
    expect(wrapper.find(Field).filter({ name: 'adminNotes' })).toHaveLength(0);
    expect(wrapper.find(Field).filter({ name: 'slyScore' })).toHaveLength(0);
    expect(wrapper.find('StyledButton')).toHaveLength(1);
  });

  it('renders admin section', () => {
    const wrapper = wrap({ isSlyAdmin: true });

    expect(wrapper.find(Field).filter({ name: 'adminRegion' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'zipcodesServed' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'bio' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'parentCompany' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'displayName' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'cv' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'imageCaption' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'chosenReview' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'vacation' })).toHaveLength(1);

    expect(wrapper.find(Field).filter({ name: 'status' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'adminNotes' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'slyScore' })).toHaveLength(1);
    expect(wrapper.find('StyledButton')).toHaveLength(1);
  });

  it('renders error', () => {
    const wrapper = wrap({ error: 'blah' });

    expect(wrapper.find('Block').contains('blah')).toBe(true);
  });

  it('handles onFormSubmit', () => {
    const handleSubmit = jest.fn();
    const wrapper = wrap({ handleSubmit });
    wrapper.find('Form').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });
});
