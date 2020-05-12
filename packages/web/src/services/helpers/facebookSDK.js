import { facebookAppId } from 'sly/web/config';

// as per https://github.com/klaemo/lazy-fb
function lazilyLoadFacebookSDK(opts = {}) {
  /* eslint-disable no-param-reassign */

  const id = 'facebook-jssdk';

  return new Promise((resolve) => {
    if (document.getElementById(id)) {
      resolve(window.FB);
      return;
    }

    const {
      lang = 'en_US',
      debug = false,
      sdkModule = '',
    } = opts;

    opts.version = opts.version || 'v3.11';
    delete opts.lang;
    delete opts.debug;

    window.fbAsyncInit = () => {
      window.FB.init(opts);
      resolve(window.FB);
    };

    const fjs = document.getElementsByTagName('script')[0];
    const js = document.createElement('script');
    js.id = id;
    const slash = sdkModule ? '/' : '';
    const srcPrefix = `https://connect.facebook.net/${lang}/sdk${slash}`;
    const srcSuffix = `${debug ? `${sdkModule}/debug` : sdkModule}.js`;
    js.src = srcPrefix + srcSuffix;
    fjs.parentNode.insertBefore(js, fjs);
  });
}

export default function loadFB() {
  return lazilyLoadFacebookSDK({
    appId: facebookAppId,
    autoLogAppEvents: true,
    xfbml: true,
    version: 'v3.1',
  });
}
