import React from 'react';
import { shallow } from 'enzyme';

import MatchedAgent from 'sly/components/organisms/MatchedAgent';
import LindaIwamota from 'sly/../private/storybook/sample-data/agent-linda-iwamota.json';

const defaultProps = {
  agent: LindaIwamota,
  heading: 'test heading',
};

const wrap = (props = {}) => shallow(<MatchedAgent {...defaultProps} {...props} />);

describe('MatchedAgent', () => {
  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('PaddedHeading').contains(defaultProps.heading)).toBeTruthy();
    expect(wrapper.find('Block').at(0).contains(defaultProps.agent.name)).toBeTruthy();
    expect(wrapper.find('Link').at(0).contains(defaultProps.agent.info.email)).toBeTruthy();
    expect(wrapper.find('Link').at(1).contains(defaultProps.agent.info.workPhone)).toBeTruthy();
  });

  it('renders loading', () => {
    const wrapper = wrap({ agent: null });

    expect(wrapper.contains('Hold on, we are matching you with a local senior living expert...')).toBeTruthy();
    expect(wrapper.find('AgentPlaceholder')).toHaveLength(1);
  });
});
