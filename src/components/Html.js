/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { googleTagManagerId, isProd, googleAppId, rokoApiKey, version } from 'sly/config';

const Html = ({
  styles, assets, state, content,
}) => {
  const helmet = Helmet.renderStatic();
  const htmlAttrs = helmet.htmlAttributes.toComponent();
  const bodyAttrs = helmet.bodyAttributes.toComponent();

  return (
    <html lang="en" {...htmlAttrs}>
      <head>
        <meta name="sly-version" content={version} />
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}

        {/*
          Google Platform Library
        */}
        <meta name="google-signin-client_id" content={googleAppId} />

        {helmet.link.toComponent()}
        {helmet.script.toComponent()}
        {assets.css.map(path => (
          <link rel="stylesheet" type="text/css" key={path} href={path} />
        ))}
        {styles}
      </head>
      <body {...bodyAttrs}>
        <div id="app" dangerouslySetInnerHTML={{ __html: content }} />
        {state.trim().length > 0 && <script dangerouslySetInnerHTML={{ __html: state }} />}
        {assets.js.map(path => <script key={path} src={`${path}`} async defer />)}
        {/* eslint-disable */}

        {/* Google Tag Manager */}
        <script type="text/javascript" defer dangerouslySetInnerHTML={{ __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${googleTagManagerId}');
        `}}></script>
        <noscript>
          {`<iframe src="https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}" height="0" width="0" />`}
        </noscript>
        {/* End Google Tag Manager */}

        {/* Begin Inspectlet Asynchronous Code */}
        {
          (isProd) && (
            <script type="text/javascript" defer dangerouslySetInnerHTML={{ __html: `
              (function() {
                window.__insp = window.__insp || [];
                __insp.push(['wid', 1731141391]);
                var ldinsp = function(){
                if(typeof window.__inspld != "undefined") return; window.__inspld = 1; var insp = document.createElement('script'); insp.type = 'text/javascript'; insp.async = true; insp.id = "inspsync"; insp.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://cdn.inspectlet.com/inspectlet.js?wid=1731141391&r=' + Math.floor(new Date().getTime()/3600000); var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(insp, x); };
                setTimeout(ldinsp, 0);
              })();
            `}}></script>
          )
        }
        {/* End Inspectlet Asynchronous Code */}

        {/* Begin Instabot Code */}
        <script type="text/javascript" defer dangerouslySetInnerHTML={{ __html: `
          setTimeout(function(){
            (function(s,d,r) {
              var f=d.getElementsByTagName(s)[0],j=d.createElement(s);
              j.text="apiKey: '${rokoApiKey}'";j.async=true;j.src=r;
              f.parentNode.insertBefore(j,f);
            })('script', document, '//app.instabot.io/jsapi/v2/rokoInstabot.js');
          }, 30000);
        `}}></script>
        {/* End Instabot Code */}

        {/* Begin Google Platform Library Code */}
        <script type="text/javascript" defer dangerouslySetInnerHTML={{ __html: `
          (function(s,d,r) {
            var f=d.getElementsByTagName(s)[0],j=d.createElement(s);
            j.async=true;j.src=r;f.parentNode.insertBefore(j,f);
          })('script', document, 'https://apis.google.com/js/platform.js');
        `}}></script>
        {/* End Google Platform Library Code */}

        {/* eslint-enable */}

      </body>
    </html>
  );
};

Html.propTypes = {
  styles: PropTypes.node.isRequired,
  assets: PropTypes.shape({
    css: PropTypes.array.isRequired,
    js: PropTypes.array.isRequired,
  }).isRequired,
  state: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default Html;
