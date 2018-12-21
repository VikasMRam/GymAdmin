import React from 'react';
import { shallow } from 'enzyme';

import AgentSummary from 'sly/components/molecules/AgentSummary';
import Image from 'sly/components/atoms/Image';

const defaultProp = {
  displayName: 'Stephen Anderson',
  firstName: 'Stephen',
  profileImageUrl: 'abc.def',
  // numRatings: 15,
  // aggregateRating: 3.53223232,
  // recentFamiliesHelped: 20,
  // citiesServed: ['Sausalito', 'Mill Valley'],
  // slyPhone: '9258312050',
};

const wrap = (props = {}) =>
  shallow(<AgentSummary {...defaultProp} {...props} />);

describe('AgentSummary', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders AgentSummary', () => {
    const wrapper = wrap();
    expect(wrapper.find(Image)).toHaveLength(1);
    expect(wrapper.find(Image).prop('src')).toEqual(defaultProp.profileImageUrl);
    expect(wrapper.contains(defaultProp.displayName)).toBeTruthy();
  });

  it('renders aggregateRating', () => {
    const wrapper = wrap({ aggregateRating: 3.53223232 });
    expect(wrapper.find('ReviewValueSection').childAt(1).dive().text()).toEqual(' 3.5 ');
  });

  it('renders aggregateRating and numRatings', () => {
    const wrapper = wrap({ aggregateRating: 3.53223232, numRatings: 15 });
    expect(wrapper.find('ReviewValueSection').childAt(1).dive().text()).toEqual(' 3.5 ');
    expect(wrapper.find('ReviewValueSection').childAt(2).dive().text()).toEqual('15 reviews');
  });

  it('renders recentFamiliesHelped', () => {
    const wrapper = wrap({ recentFamiliesHelped: 20 });
    expect(wrapper.find('FamiliesHelpedSection').childAt(1).dive().text()).toEqual('20');
  });

  it('renders citiesServed', () => {
    const wrapper = wrap({ citiesServed: ['Sausalito', 'Mill Valley'] });
    expect(wrapper.find('AgentsCitiesSection').childAt(0).dive().text()).toEqual('Stephen\'s Cities: ');
    expect(wrapper.find('AgentsCitiesSection').childAt(1).dive().text()).toEqual('Sausalito, Mill Valley');
  });

  it('handles onButtonClick', () => {
    const onButtonClick = jest.fn();
    const wrapper = wrap({ onButtonClick });
    const AskQuestionButton = wrapper.find('AskQuestionButton');
    expect(onButtonClick).toHaveBeenCalledTimes(0);
    AskQuestionButton.simulate('click');
    expect(onButtonClick).toHaveBeenCalledTimes(1);
  });

  it('handles onPhoneClick', () => {
    const onPhoneClick = jest.fn();
    const wrapper = wrap({ slyPhone: '9258312050', onPhoneClick });
    const Link = wrapper.find('Link');
    expect(onPhoneClick).toHaveBeenCalledTimes(0);
    Link.simulate('click');
    expect(onPhoneClick).toHaveBeenCalledTimes(1);
  });
});
