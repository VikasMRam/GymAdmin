import React from 'react';
import { shallow } from 'enzyme';

import TrustScoreTile from '.';

import RhodaGoldmanPlaza from 'sly/storybook/sample-data/property-rhoda-goldman-plaza.json';

const rgsAux = {
  rgsInfo: { trustScore: 95, scoreParams: { trustScore: 95, lastInspectionDate: new Date(), licensedDate: new Date()   } },
};
const RhodaGoldmanPlazaWithAll = { ...RhodaGoldmanPlaza, rgsAux };
const wrap = (props = {}) => shallow(<TrustScoreTile community={RhodaGoldmanPlazaWithAll} {...props} />);

describe('TrustTile', () => {
  it('renders', () => {
    const wrapper = wrap();
    expect(wrapper.find('IconItem')).toHaveLength(3);
    expect(wrapper.find('Link')).toHaveLength(1);
  });
});
