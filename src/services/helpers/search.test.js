
import { filterSearchParams, filterLinkPath } from 'sly/services/helpers/search';

let baseParams = {toc:'assisted-living',state:'california',city:'san-francisco'};
let filterParams = {size:'small',radius:20,dummy:'',some:''};

it('filter search params checks against searchWhiteListParmas correctly', () => {
  let fullParams = {size:'',radius:'',dummy:'',some:''};
  expect(filterSearchParams(fullParams)).toEqual({size:'',radius:''});

});

it('type of care filters are transformed into url correctly', () => {

  // When the path and search params contain the same filters selected should be true
  expect(filterLinkPath({...baseParams,...filterParams},{toc:'assisted-living'}))
    .toEqual({path:'/assisted-living/california/san-francisco?radius=20&size=small',
      selected:true});

  // When the path and search params contain different filters selected should be false
  expect(filterLinkPath({...baseParams,...filterParams},{toc:'independent-living'}))
    .toEqual({path:'/independent-living/california/san-francisco?radius=20&size=small',
      selected:false});

  baseParams.toc='retirement-community';
  expect(filterLinkPath({...baseParams,...filterParams},{toc:'retirement-community'}))
    .toEqual({path:'/retirement-community/california/san-francisco?radius=20&size=small',
      selected:true});

});

it('size & budget & radius filters are transformed into url correctly', () => {
  baseParams.toc='assisted-living';
  expect(filterLinkPath({...baseParams,...filterParams},{budget:2000}))
    .toEqual({path:'/assisted-living/california/san-francisco?budget=2000&radius=20&size=small',
      selected:false});
  //
  filterParams.budget = 3000;
  expect(filterLinkPath({...baseParams,...filterParams},{budget:2000}))
    .toEqual({path:'/assisted-living/california/san-francisco?budget=2000&radius=20&size=small',
      selected:false});
  //
  filterParams.budget=4000;
  expect(filterLinkPath({...baseParams,...filterParams},{budget:4000}))
    .toEqual({path:'/assisted-living/california/san-francisco?budget=4000&radius=20&size=small',
      selected:true});

  expect(filterLinkPath({...baseParams,...filterParams},{size:'small'}))
    .toEqual({path:'/assisted-living/california/san-francisco?budget=4000&radius=20&size=small',
      selected:true});

  filterParams.size='medium';
  expect(filterLinkPath({...baseParams,...filterParams},{size:'small'}))
    .toEqual({path:'/assisted-living/california/san-francisco?budget=4000&radius=20&size=small',
      selected:false});

});


