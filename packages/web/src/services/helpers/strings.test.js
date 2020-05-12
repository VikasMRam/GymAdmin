import { titleize } from 'sly/web/services/helpers/strings';


it('titleizes parametrized correctly', () => {
  const inString = 'san-francisco';
  expect(titleize(inString)).toEqual('San Francisco');
});
