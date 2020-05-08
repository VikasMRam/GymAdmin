import * as selectors from './selectors';

const altState = {
  test1: 'variant1',
  test2: 'variant2',
};

describe('experiments selectors', () => {
  test('initialState', () => {
    expect(selectors.initialState).toEqual({});
  });

  test('getExperiments', () => {
    expect(selectors.getExperiments(undefined)).toEqual({});
    expect(selectors.getExperiments({})).toEqual({});
    expect(selectors.getExperiments(altState)).toEqual(altState);
  });

  test('getExperimentByName', () => {
    expect(selectors.getExperimentByName(undefined, 'test')).toEqual(undefined);
    expect(selectors.getExperimentByName({}, 'test')).toEqual(undefined);
    expect(selectors.getExperimentByName(altState, 'test1')).toEqual('variant1');
  });
});
