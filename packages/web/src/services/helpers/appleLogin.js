import { appleApppID } from 'sly/web/config';

function lazyLoadAppleLogin(opts = {}) {
  /* eslint-disable no-param-reassign */

  const id = 'apple-login-script';

  return new Promise((resolve) => {
    if (document.getElementById(id)) {
      resolve(window.AppleID);
      return;
    }

    const {
      lang = 'en_US',
    } = opts;


    window.AppleID.auth.init(opts);

    // clientId : '[CLIENT_ID]',
    // scope : '[SCOPES]',
    // redirectURI : '[REDIRECT_URI]',
    // state : '[STATE]',
    // nonce : '[NONCE]',
    // usePopup : true //or false defaults to false

    const fjs = document.getElementsByTagName('script')[0];
    const js = document.createElement('script');
    js.id = id;
    const srcPrefix = `https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/${lang}/appleid.auth.js`;

    js.src = srcPrefix;
    fjs.parentNode.insertBefore(js, fjs);
  });
}

export default function loadFB() {
  return lazyLoadAppleLogin({
    clientId: appleApppID,
    usePop: true,
  });
}
