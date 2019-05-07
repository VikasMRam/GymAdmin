import SlyEvent from 'sly/services/helpers/events';

export const selectedExperimentVariants = {};

export const win = (name) => {
  if (selectedExperimentVariants[name]) {
    const event = {
      action: 'win_experiment', category: name, label: selectedExperimentVariants[name],
    };
    SlyEvent.getInstance().sendEvent(event);
  }
};
