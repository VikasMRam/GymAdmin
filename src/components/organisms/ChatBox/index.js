import React, { Component } from 'react';
import { injectGlobal } from 'styled-components';
import { bool } from 'prop-types';

import { isBrowser, olarkSiteId, rokoApiKey} from 'sly/config';
import { getKey } from 'sly/components/themes';

injectGlobal`
  body.ChatBox-page-with-sticky-footer #hbl-live-chat-wrapper .olark-launch-button {
    bottom: ${getKey('sizes.chatBox.pageWithStickyFooterBottomMargin')}!important;
  }
  body.ChatBox-footer-reached #hbl-live-chat-wrapper .olark-launch-button {
    bottom: ${getKey('sizes.chatBox.footerReachedBottomMargin')}!important;
  }
  .roko-instabot-widget-button  {
    z-index: 10000!important;
    margin-bottom: ${getKey('sizes.spacing.massive')}!important;
  }
  .olark-launch-button {
    z-index: 10000!important;
    margin-bottom: ${getKey('sizes.spacing.massive')}!important;
  }
`;

const loadOlark = () => {
  // /* eslint-disable */
  // (function(o,l,a,r,k,y){if(o.olark)return;
  //   r="script";y=l.createElement(r);r=l.getElementsByTagName(r)[0];
  //   y.async=1;y.src="//"+a;r.parentNode.insertBefore(y,r);
  //   y=o.olark=function(){k.s.push(arguments);k.t.push(+new Date)};
  //   y.extend=function(i,j){y("extend",i,j)};
  //   y.identify=function(i){y("identify",k.i=i)};
  //   y.configure=function(i,j){y("configure",i,j);k.c[i]=j};
  //   k=y._={s:[],t:[+new Date],c:{},l:a};
  //   })(window,document,"static.olark.com/jsclient/loader.js");
  // /* eslint-enable */
};

export default class ChatBox extends Component {
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
    if (isBrowser) {
      // setTimeout(() => {
      //   loadOlark();
      //   window.olark.identify(olarkSiteId);
      // }, 30000);
    }

    return (
      <>
        {/* Begin Instabot Code */}
        <script
          defer
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: `
            setTimeout(function(){
              (function(s,d,r) {
                var f=d.getElementsByTagName(s)[0],j=d.createElement(s);
                j.text="apiKey: '${rokoApiKey}'";j.async=true;j.src=r;
                f.parentNode.insertBefore(j,f);
              })('script', document, '//widget.instabot.io/jsapi/rokoInstabot.js');
            }, 30000);
          ` }}
        />
        {/* End Instabot Code */}
      </>
    );
  }
}
