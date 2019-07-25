import React from 'react';
import { shallow } from 'enzyme';

import DashboardMyFamilyStickyFooter from 'sly/components/organisms/DashboardMyFamilyStickyFooter';

const onItem1Click = jest.fn();
const onItem2Click = jest.fn();
const options = [
  {
    text: 'Update Stage', icon: 'flag', iconPalette: 'slate', onClick: onItem1Click,
  },
  {
    text: 'Add Note', icon: 'add-note', iconPalette: 'slate', onClick: onItem2Click, ghost: true,
  },
];

const stage = 'Discussing Options';

const wrap = (props = {}) => shallow(<DashboardMyFamilyStickyFooter options={options} stage={stage} {...props} />);

describe('DashboardMyFamilyStickyFooter', () => {
  it('render DashboardMyFamilyStickyFooter', () => {
    const wrapper = wrap({ });
    expect(wrapper.find('OptionsList')).toHaveLength(0);
  });
  it('render DashboardMyFamilyStickyFooter optionsList', () => {
    const wrapper = wrap({ showOptions: true });
    expect(wrapper.find('OptionsList')).toHaveLength(1);
    expect(wrapper.find('OptionsList').dive().find('OptionItemWrapper')).toHaveLength(2);
    const optionItemWrapper1 = wrapper.find('OptionsList').dive().find('OptionItemWrapper').at(0);
    optionItemWrapper1.simulate('click');
    expect(onItem1Click).toHaveBeenCalled();
    const optionItemWrapper2 = wrapper.find('OptionsList').dive().find('OptionItemWrapper').at(1);
    optionItemWrapper2.simulate('click');
    expect(onItem2Click).toHaveBeenCalled();
  });
});
