export const initialState = {};

export const getExperiments = (state = initialState) => state;
export const getExperimentByName = (state = initialState, experimentName) => state[experimentName];
