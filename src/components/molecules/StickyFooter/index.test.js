import React, { Component } from 'react';
import { mount } from 'enzyme';
import StickyFooter from '.';


const footerInfo = {
  title: 'Some',
  name: 'Other',
  ctaTitle: 'Contact',
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
        footerInfo={footerInfo}
        onFooterClick={this.onContactClick}
      />
    );
  }
}

const wrap = (props = {}) =>
  mount(<StickyFooter onFooterClick={onContactClick} {...props} />);

describe('StickyFooter', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({
      children: 'test',
      footerInfo,
    });
    expect(wrapper.contains('test')).toBe(false);
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
