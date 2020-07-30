import React from 'react';
import { shallow } from 'enzyme';

import { End } from 'sly/web/components/wizards/assessment';
import RhodaGoldmanPlaza from 'sly/storybook/sample-data/property-rhoda-goldman-plaza.json';
import LindaIwamota from 'sly/storybook/sample-data/agent-linda-iwamota.json';

const handleSubmit = jest.fn();
const defaultProps = {
  handleSubmit,
  community: RhodaGoldmanPlaza,
  agent: LindaIwamota,
};
const wrap = (props = {}) => shallow(<End {...defaultProps} {...props} />);

describe('Wizards|assessment - Steps|End', () => {
  it('does not render children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBeFalsy();
  });

  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('MatchedAgent')).toHaveLength(1);
    expect(wrapper.find('SimilarCommunities')).toHaveLength(1);
  });

  it('renders without community', () => {
    const wrapper = wrap({
      community: null,
    });

    expect(wrapper.find('MatchedAgent')).toHaveLength(1);
    expect(wrapper.find('SimilarCommunities')).toHaveLength(0);
  });

  it('renders with hasNoAgent', () => {
    const wrapper = wrap({
      hasNoAgent: true,
    });

    expect(wrapper.find('PostConversionGreetingForm')).toHaveLength(1);
    expect(wrapper.find('SimilarCommunities')).toHaveLength(1);
  });
});
