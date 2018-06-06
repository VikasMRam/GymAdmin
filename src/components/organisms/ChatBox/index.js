import { Component } from 'react';
import { injectGlobal } from 'styled-components';
import { bool } from 'prop-types';

import { isTest, isBrowser, olarkSiteId } from 'sly/config';
import { getKey } from 'sly/components/themes';

injectGlobal`
  @media screen and (max-width: ${getKey('sizes.breakpoint.laptop')}) {
    body.ChatBox-page-with-sticky-footer #hbl-live-chat-wrapper .olark-launch-button {
      bottom: ${getKey('sizes.chatBox.pageWithStickyFooterBottomMargin')}!important;
    }
  }
  @media screen and (min-width: ${getKey('sizes.breakpoint.tablet')}) {
    body.ChatBox-footer-reached #hbl-live-chat-wrapper .olark-launch-button {
      bottom: ${getKey('sizes.chatBox.footerReachedBottomMargin')}!important;
    }
  }
`;

const loadOlark = () => {
  /* eslint-disable */
  (function(o,l,a,r,k,y){if(o.olark)return;
    r="script";y=l.createElement(r);r=l.getElementsByTagName(r)[0];
    y.async=1;y.src="//"+a;r.parentNode.insertBefore(y,r);
    y=o.olark=function(){k.s.push(arguments);k.t.push(+new Date)};
    y.extend=function(i,j){y("extend",i,j)};
    y.identify=function(i){y("identify",k.i=i)};
    y.configure=function(i,j){y("configure",i,j);k.c[i]=j};
    k=y._={s:[],t:[+new Date],c:{},l:a};
    })(window,document,"static.olark.com/jsclient/loader.js");
  /* eslint-enable */
};

class ChatBox extends Component {
  static propTypes = {
    footerReached: bool,
    pageWithStickyFooter: bool,
  };

  static defaultProps = {
    footerReached: false,
    pageWithStickyFooter: false,
  };

  componentDidMount() {
    const { footerReached, pageWithStickyFooter } = this.props;
    if (footerReached) {
      document.body.classList.add('ChatBox-footer-reached');
    }
    if (pageWithStickyFooter) {
      document.body.classList.add('ChatBox-page-with-sticky-footer');
    }
  }

  componentDidUpdate() {
    const { footerReached } = this.props;
    if (footerReached) {
      document.body.classList.add('ChatBox-footer-reached');
    } else {
      document.body.classList.remove('ChatBox-footer-reached');
    }
  }

  render() {
    if (isBrowser && !isTest) {
      loadOlark();
      window.olark.identify(olarkSiteId);
    }

    return null;
  }
}

export default ChatBox;
