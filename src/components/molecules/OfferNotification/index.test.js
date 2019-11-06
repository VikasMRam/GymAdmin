import React from 'react';
import { shallow } from 'enzyme';

import OfferNotification from 'sly/components/molecules/OfferNotification';
import GetCustomPricingContainer from 'sly/containers/GetCustomPricingContainer';

jest.mock('sly/containers/AskAgentQuestionContainer');

const title = 'test title';
const description = 'test description';
const wrap = (props = {}) => shallow(<OfferNotification title={title} {...props} />);

describe('OfferNotification', () => {
  it('renders', () => {
    const wrapper = wrap({ description });
    const tWRapper = wrapper.find('TopWrapper');

    expect(tWRapper).toHaveLength(1);
    expect(tWRapper.contains(title)).toBe(true);
    expect(tWRapper.contains(description)).toBe(true);
    expect(wrapper.find('BigScreenLearnMore')).toHaveLength(0);
  });

  it('renders with hasLearnMore', () => {
    const wrapper = wrap({ description, hasLearnMore: true });
    const tWRapper = wrapper.find('TopWrapper');

    expect(tWRapper).toHaveLength(1);
    expect(tWRapper.contains(title)).toBe(true);
    expect(tWRapper.contains(description)).toBe(true);
    expect(wrapper.find(GetCustomPricingContainer)).toHaveLength(1);
  });
});
