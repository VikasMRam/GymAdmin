import * as actions from './actions';

test('toggleChatBoxFooterReached', () => {
  expect(actions.toggleChatBoxFooterReached()).toEqual(expect.objectContaining({
    type: actions.CHAT_BOX_FOOTER_REACHED_TOGGLE,
  }));
});
