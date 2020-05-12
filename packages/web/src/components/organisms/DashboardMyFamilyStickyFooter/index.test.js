import React from 'react';
import { shallow } from 'enzyme';

import DashboardMyFamilyStickyFooter from 'sly/web/components/organisms/DashboardMyFamilyStickyFooter';

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
const stage = 'New';

const wrap = (props = {}) => shallow(<DashboardMyFamilyStickyFooter options={options} stage={stage} stageLabel={stage} {...props} />);

describe('DashboardMyFamilyStickyFooter', () => {
  it('renders', () => {
    const wrapper = wrap();

    const buttons = wrapper.find('RightSideButtons').find('Button');
    expect(buttons).toHaveLength(1);
    expect(buttons.at(0).contains(options[options.length - 1].text)).toBeTruthy();
    expect(wrapper.find('Stage').find('[stage="New"]')).toHaveLength(1);
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
    expect(wrapper.find('Stage').find('[stage="New"]')).toHaveLength(0);
  });

  it('renders only one button', () => {
    const [, newOptions] = options;
    const wrapper = wrap({ options: [newOptions] });

    const buttons = wrapper.find('RightSideButtons').find('Button');
    expect(buttons).toHaveLength(1);
    expect(buttons.at(0).contains(options[options.length - 1].text)).toBeTruthy();
    expect(wrapper.find('Stage').find('[stage="New"]')).toHaveLength(1);
  });

  it('renders without stage', () => {
    const wrapper = wrap({ stage: undefined });

    const buttons = wrapper.find('RightSideButtons').find('Button');
    expect(buttons).toHaveLength(1);
    expect(buttons.at(0).contains(options[options.length - 1].text)).toBeTruthy();
    expect(wrapper.find('Stage').find('[stage="New"]')).toHaveLength(0);
  });
});
