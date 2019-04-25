import React from 'react';
import { shallow } from 'enzyme';

import DashboardMyFamilyStickyFooter from 'sly/components/organisms/DashboardMyFamilyStickyFooter';

const onItemClick = jest.fn();
const options = [
  {
    text: 'Update Stage', icon: 'flag', iconPalette: 'slate', onClick: onItemClick,
  },
  {
    text: 'Add Note', icon: 'add-note', iconPalette: 'slate', onClick: onItemClick, ghost: true,
  },
];

const stageProps = {
  text: 'Connected - Discussing Options',
  currentStage: 1,
};


const wrap = (props = {}) => shallow(<DashboardMyFamilyStickyFooter options={options} stageProps={stageProps} {...props} />);

describe('DashboardMyFamilyStickyFooter', () => {
  it('render DashboardMyFamilyStickyFooter', () => {
    const wrapper = wrap({ });
    expect(wrapper.find('OptionsList')).toHaveLength(0);
  });
  it('render DashboardMyFamilyStickyFooter optionsList', () => {
    const wrapper = wrap({ showOptions: true });
    expect(wrapper.find('OptionsList')).toHaveLength(1);
    expect(wrapper.find('OptionsList').dive().find('IconItem')).toHaveLength(2);
  });
});
