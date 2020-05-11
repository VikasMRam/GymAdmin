import * as experiments from './experiments/selectors';
import * as chatBox from './chatBox/selectors';

export const getExperiment = (state, experimentName) =>
  experiments.getExperimentByName(state.experiments, experimentName);

export const getExperiments = state =>
  experiments.getExperiments(state.experiments);

export const hasChatBoxFooterReached = state =>
  chatBox.hasFooterReached(state.chatBox);
