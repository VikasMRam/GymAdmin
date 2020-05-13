import React from 'react';
import { shallow } from 'enzyme';

import CommunityAskQuestionAgentForm from 'sly/web/components/organisms/CommunityAskQuestionAgentForm';
import { Block } from 'sly/web/components/atoms';

const defaultProps = {
  placeholder: 'rhoda',
  heading: 'We&apos;ve received your tour request.',
  description: 'Your Seniorly Partner Agent will reach out to you soon. Feel free to ask them any questions in the meantime.',
};

const wrap = (props = {}) =>
  shallow(<CommunityAskQuestionAgentForm {...defaultProps} {...props} />);

describe('CommunityAskQuestionAgentForm', () => {
  it('renders', () => {
    const wrapper = wrap();
    expect(wrapper.find('StyledField')).toHaveLength(1);
    expect(wrapper.find(Block).filter({ palette: 'danger' })).toHaveLength(0);
    expect(wrapper.contains(defaultProps.heading)).toBeTruthy();
    expect(wrapper.contains(defaultProps.description)).toBeTruthy();
  });

  it('render error when error is passed', () => {
    const wrapper = wrap({ error: 'has an error' });
    expect(wrapper.find('StyledField')).toHaveLength(1);
    expect(wrapper.find(Block).filter({ palette: 'danger' })).toHaveLength(1);
    expect(wrapper.contains(defaultProps.heading)).toBeTruthy();
    expect(wrapper.contains(defaultProps.description)).toBeTruthy();
  });
});
