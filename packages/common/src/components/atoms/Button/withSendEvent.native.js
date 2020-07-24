import SlyEvent from 'sly/web/services/helpers/events';

const withSendEvent = (event, { onPress }) => ({
  onPress: event ? (e) => {
    SlyEvent.getInstance().sendEvent(event);
    return onPress && onPress(e);
  } : onPress,
});

export default withSendEvent;
