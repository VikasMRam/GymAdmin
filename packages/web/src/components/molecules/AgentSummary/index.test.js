import React from 'react';
import { shallow } from 'enzyme';

import AgentSummary from 'sly/web/components/molecules/AgentSummary';
import Image from 'sly/web/components/atoms/Image';
import LindaIwamota from 'sly/storybook/sample-data/agent-linda-iwamota.json';

const defaultProp = {
  agent: LindaIwamota,
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
    expect(wrapper.find(Image).prop('src')).toEqual(defaultProp.agent.info.profileImageUrl);
    expect(wrapper.contains(defaultProp.agent.info.displayName)).toBeTruthy();
    expect(wrapper.contains(`${LindaIwamota.info.displayName.split(' ')[0]}'s Cities: `)).toBeTruthy();
    expect(wrapper.contains(LindaIwamota.info.citiesServed.join(', '))).toBeTruthy();
  });

  it('renders aggregateRating and numRatings', () => {
    const newAgent = {
      ...defaultProp.agent, aggregateRating: { ratingValue: 3.53223232, numRatings: 15 },
    };
    const wrapper = wrap({ agent: newAgent });
    expect(wrapper.find('ReviewValueSection').childAt(1).render().text()).toEqual(' 3.5 ');
    expect(wrapper.find('ReviewValueSection').childAt(2).render().text()).toEqual('from 15 reviews');
  });

  it('renders aggregateRating and one numRatings', () => {
    const newAgent = {
      ...defaultProp.agent, aggregateRating: { ratingValue: 3.53223232, numRatings: 1 },
    };
    const wrapper = wrap({ agent: newAgent });
    expect(wrapper.find('ReviewValueSection').childAt(1).render().text()).toEqual(' 3.5 ');
    expect(wrapper.find('ReviewValueSection').childAt(2).render().text()).toEqual('from 1 review');
  });

  it('renders recentFamiliesHelped', () => {
    const newAgent = {
      ...defaultProp.agent, info: { ...defaultProp.agent.info, recentFamiliesHelped: 20 },
    };
    const wrapper = wrap({ agent: newAgent });
    expect(wrapper.contains(20)).toBeTruthy();
  });

  it('renders parentCompany', () => {
    const newAgent = {
      ...defaultProp.agent, info: { ...defaultProp.agent.info, parentCompany: 'testParentCompany' },
    };
    const wrapper = wrap({ agent: newAgent });
    expect(wrapper.contains('testParentCompany')).toBeTruthy();
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
