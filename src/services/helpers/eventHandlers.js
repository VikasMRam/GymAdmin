import SlyEvent from 'sly/services/helpers/events';

export const clickEventHandler = (category, label) => {
  return (event) => {
    SlyEvent.getInstance().sendEvent({
      category,
      action: 'click',
      label,
    });
  };
};
