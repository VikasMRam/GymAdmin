import { createGlobalStyle } from 'styled-components';

import { size } from 'sly/components/themes';

export default createGlobalStyle`
  body.ChatBox-page-with-sticky-footer #hbl-live-chat-wrapper .olark-launch-button {
    bottom: ${size('chatBox.pageWithStickyFooterBottomMargin')}!important;
  }
  body.ChatBox-footer-reached #hbl-live-chat-wrapper .olark-launch-button {
    bottom: ${size('chatBox.footerReachedBottomMargin')}!important;
  }
  .roko-instabot-widget-button  {
    z-index: 10000!important;
    margin-bottom: ${size('spacing.massive')}!important;
  }
  .olark-launch-button {
    z-index: 10000!important;
    margin-bottom: ${size('spacing.massive')}!important;
  }
`;

