import { removeQueryParamFromURL } from 'sly/services/helpers/url';

it('removeQueryParamFromURL removes correctly', () => {
  const url = 'http://www.lvh.me/foo?sly_uuid=blah';
  expect(removeQueryParamFromURL('sly_uuid', url)).toEqual('http://www.lvh.me/foo');
});

it('removeQueryParamFromURL retains other query params correctly', () => {
  const url = 'http://www.lvh.me/foo?abc=def&sly_uuid=blah';
  expect(removeQueryParamFromURL('sly_uuid', url)).toEqual('http://www.lvh.me/foo?abc=def');
});

it('removeQueryParamFromURL behaves correctly when passed url without query params', () => {
  const url = 'http://www.lvh.me/foo';
  expect(removeQueryParamFromURL('sly_uuid', url)).toEqual('http://www.lvh.me/foo');
});
