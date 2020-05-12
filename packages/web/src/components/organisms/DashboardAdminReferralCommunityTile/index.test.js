import React from 'react';
import { shallow } from 'enzyme';

import DashboardAdminReferralCommunityTile from 'sly/web/components/organisms/DashboardAdminReferralCommunityTile';

const community = {
  name: 'Rhoda Goldname Plaza',
  address: {
    city: 'San Francisco',
    line1: '2180 Post Street',
    state: 'CA',
    zip: '94115',
  },
  propInfo: {
    typeCare: ['Assisted Living'],
  },
  rgsAux: {
    rgsInfo: {
      contract_info: {
        hasContract: true,
      },
    },
  },
};

const addressString = '2180 Post Street, San Francisco, 94115, CA';

const defaultProps = {
  community,
};

const wrap = (props = {}) => shallow(<DashboardAdminReferralCommunityTile {...defaultProps} {...props} />);

describe('DashboardAdminReferralCommunityTile', () => {
  it('does not render passed children', () => {
    const wrapper = wrap({ children: 'test' });

    expect(wrapper.contains('test')).toBeFalsy();
  });

  it('renders', () => {
    const wrapper = wrap();
    expect(wrapper.contains(community.name)).toBe(true);
    expect(wrapper.contains(addressString)).toBe(true);
  });

  it('renders with title', () => {
    const title = 'Family Interested in';
    const wrapper = wrap({ title });
    expect(wrapper.contains(community.name)).toBe(true);
    expect(wrapper.contains(addressString)).toBe(true);

    expect(wrapper.contains(title)).toBe(true);
  });

  it('handles actionClick', () => {
    const actionText = 'Click Me';
    const actionClick = jest.fn();
    const wrapper = wrap({ actionText, actionClick });
    expect(wrapper.contains(community.name)).toBe(true);
    expect(wrapper.contains(addressString)).toBe(true);

    const button = wrapper.find('Button');
    expect(button.contains(actionText)).toBeTruthy();
    button.simulate('click');
    expect(actionClick).toHaveBeenCalled();
  });

  it('renders referralSentAt', () => {
    const referralSentAt = '2018-03-20T08:25:56Z';
    const referralSentAtString = '3/20/18, 8:25AM';
    const wrapper = wrap({ referralSentAt });
    expect(wrapper.contains(community.name)).toBe(true);
    expect(wrapper.contains(addressString)).toBe(true);

    expect(wrapper.contains(referralSentAtString)).toBe(true);
  });

  it('renders stage', () => {
    const stage = 'New';
    const wrapper = wrap({ stage });
    expect(wrapper.contains(community.name)).toBe(true);
    expect(wrapper.contains(addressString)).toBe(true);

    expect(wrapper.find('Stage').find('[stage="New"]')).toHaveLength(1);
  });

  it('renders shouldShowHasContract', () => {
    const isAdminUser = true;
    const wrapper = wrap({ isAdminUser });
    expect(wrapper.contains(community.name)).toBe(true);
    expect(wrapper.contains(addressString)).toBe(true);

    expect(wrapper.find('StyledIconBadge').find('[text="HAS CONTRACT"]')).toHaveLength(1);
  });

  it('renders shouldShowNoContract', () => {
    const isAdminUser = true;
    const newCommunity = { ...community };
    newCommunity.rgsAux.rgsInfo.contract_info.hasContract = false;
    const wrapper = wrap({ community: newCommunity, isAdminUser });
    expect(wrapper.contains(community.name)).toBe(true);
    expect(wrapper.contains(addressString)).toBe(true);

    expect(wrapper.find('StyledIconBadge').find('[text="NO CONTRACT"]')).toHaveLength(1);
  });
});
