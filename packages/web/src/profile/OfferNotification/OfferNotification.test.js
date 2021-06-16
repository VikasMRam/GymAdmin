import React from 'react';
import { shallow } from 'enzyme';

import OfferNotification from 'sly/web/profile/OfferNotification/OfferNotification';
import GetCustomPricingContainer from 'sly/web/containers/GetCustomPricingContainer';

jest.mock('sly/web/containers/AskAgentQuestionContainer');

const title = 'test title';
const description = 'test description';
const wrap = (props = {}) => shallow(<OfferNotification title={title} {...props} />);

describe('OfferNotification', () => {
  it('renders', () => {
    const wrapper = wrap({ description });
    const top = wrapper.find('Flex');

    expect(top).toHaveLength(1);
    expect(top.contains(title)).toBe(true);
    expect(top.contains(description)).toBe(true);
    expect(wrapper.find('BigScreenLearnMore')).toHaveLength(0);
  });

  it('renders with hasLearnMore', () => {
    const wrapper = wrap({ description, hasLearnMore: true });
    const top = wrapper.find('Flex');

    expect(top).toHaveLength(1);
    expect(top.contains(title)).toBe(true);
    expect(top.contains(description)).toBe(true);
    expect(wrapper.find(GetCustomPricingContainer)).toHaveLength(1);
  });
});
