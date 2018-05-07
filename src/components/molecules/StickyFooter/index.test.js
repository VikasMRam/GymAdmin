import React, { Component } from 'react';
import { mount } from 'enzyme';
import StickyFooter from '.';

const communityEmptyContact = {
  contacts: [],
};

const communityWithContact = {
  contacts: [{ foo: 'bar' }],
};

function onContactClick() {
  // console.log('onContactClick');
}

class StickyFooterWithState extends Component {
  state = {
    count: 0,
  };
  onContactClick = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };
  render() {
    return (
      <StickyFooter
        community={communityEmptyContact}
        onContactClick={this.onContactClick}
      />
    );
  }
}

const wrap = (props = {}) =>
  mount(<StickyFooter onContactClick={onContactClick} {...props} />);

describe('StickyFooter', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({
      children: 'test',
      community: communityEmptyContact,
    });
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders Seniorly Conceirge as default Agent Name if no contacts found', () => {
    const wrapper = wrap({ community: communityEmptyContact });
    expect(wrapper.contains('Seniorly Conceirge')).toBe(true);
  });

  it('does not render Seniorly Conceirge as default Agent Name if contacts are found', () => {
    const wrapper = wrap({ community: communityWithContact });
    expect(wrapper.contains('Seniorly Conceirge')).toBe(false);
  });

  it('onContactClick test', () => {
    const wrapper = mount(<StickyFooterWithState />);
    const contactButton = wrapper.find('button');

    expect(wrapper.state()).toEqual({ count: 0 });
    contactButton.simulate('click');
    expect(wrapper.state()).toEqual({ count: 1 });
    contactButton.simulate('click');
    expect(wrapper.state()).toEqual({ count: 2 });
  });
});
