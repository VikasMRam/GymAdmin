import React from 'react';
import { shallow } from 'enzyme';

import CommunityAskQuestionAgentForm from 'sly/components/organisms/CommunityAskQuestionAgentForm';
import { Block } from 'sly/components/atoms';

const wrap = (props = {}) =>
  shallow(<CommunityAskQuestionAgentForm {...props} />);

describe('CommunityAskQuestionAgentForm', () => {
  it('renders', () => {
    const wrapper = wrap();
    expect(wrapper.find('Styled(Field)')).toHaveLength(1);
    expect(wrapper.find(Block).filter({ palette: 'danger' })).toHaveLength(0);
  });

  it('render error when error is passed', () => {
    const wrapper = wrap({ error: 'has an error' });
    expect(wrapper.find('Styled(Field)')).toHaveLength(1);
    expect(wrapper.find(Block).filter({ palette: 'danger' })).toHaveLength(1);
  });
});
