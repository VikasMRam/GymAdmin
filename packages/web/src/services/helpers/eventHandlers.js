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


export const actionEventHandler = (category, action, label) => {
  return (event) => {
    SlyEvent.getInstance().sendEvent({
      category,
      action,
      label,
    });
  };
};
