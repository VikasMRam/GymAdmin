import React from 'react';
import { shallow } from 'enzyme';

import DashboardMyFamilyStickyFooter from 'sly/components/organisms/DashboardMyFamilyStickyFooter';

const itemClicks = [
  jest.fn(),
  jest.fn(),
];
const options = [
  {
    text: 'Update Stage', icon: 'flag', iconPalette: 'slate', onClick: itemClicks[0],
  },
  {
    text: 'Add Note', icon: 'add-note', iconPalette: 'slate', onClick: itemClicks[1], ghost: true,
  },
];
const stage = 'Discussing Options';

const wrap = (props = {}) => shallow(<DashboardMyFamilyStickyFooter options={options} stage={stage} {...props} />);

describe('DashboardMyFamilyStickyFooter', () => {
  it('renders', () => {
    const wrapper = wrap();

    const buttons = wrapper.find('RightSideButtons').find('Button');
    expect(buttons).toHaveLength(options.length);
    buttons.forEach((button, i) => {
      expect(button.contains(options[options.length - 1 - i].text)).toBeTruthy();
    });
  });

  it('renders with showAcceptRejectButtons', () => {
    const wrapper = wrap({
      showAcceptRejectButtons: true,
    });

    const buttons = wrapper.find('AcceptRejectButtonsWrapper').find('Button');
    expect(buttons).toHaveLength(options.length);
    buttons.forEach((button, i) => {
      expect(button.contains(options[i].text)).toBeTruthy();
    });
  });
});
