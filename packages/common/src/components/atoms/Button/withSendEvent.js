import SlyEvent from 'sly/web/services/helpers/events';

const withSendEvent = (event, { onClick }) => ({
  onClick: event ? (e) => {
    SlyEvent.getInstance().sendEvent(event);
    return onClick && onClick(e);
  } : onClick,
});

export default withSendEvent;
