import SlyEvent from 'sly/web/services/helpers/events';

export const clickEventHandler = (category, label) => {
  return (event) => {
    SlyEvent.getInstance().sendEvent({
      category,
      action: 'click',
      label,
    });
  };
};
