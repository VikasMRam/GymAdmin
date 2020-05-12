import React from 'react';
import { shallow } from 'enzyme';

import OptionsList from 'sly/web/components/molecules/OptionsList';

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

const wrap = (props = {}) => shallow(<OptionsList options={options} stage={stage} {...props} />);

describe('OptionsList', () => {
  it('render', () => {
    const wrapper = wrap();
    const items = wrapper.find('OptionItemWrapper');

    expect(items).toHaveLength(options.length);
    items.forEach((item, i) => {
      expect(item.find('StyledIconItem').contains(options[i].text)).toBeTruthy();
    });
  });
});
