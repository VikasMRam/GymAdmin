import * as experiments from './experiments/selectors';

export const getExperiment = (state, experimentName) =>
  experiments.getExperimentByName(state.experiments, experimentName);

export const getExperiments = state =>
  experiments.getExperiments(state.experiments);
