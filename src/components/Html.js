/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { googleTagManagerId, isProd, googleAppId, version, publicPath } from 'sly/config';

const Html = ({
  linkElements, styleElements, scriptElements, state, content,
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
        <link rel="preload" href={`${publicPath}/fonts/azo/azosans-medium-TEMP-REPLACEME-webfont.woff2`} as="font" crossOrigin="anonymous" />
        <link rel="preload" href={`${publicPath}/fonts/azo/azosans-regular-webfont.woff2`} as="font" crossOrigin="anonymous" />
        <link rel="preload" href={`${publicPath}/fonts/azo/azosans-light-webfont.woff2`} as="font" crossOrigin="anonymous" />
        {styleElements}
        {linkElements}
        {helmet.link.toComponent()}
      </head>
      <body {...bodyAttrs}>
        <div id="app" dangerouslySetInnerHTML={{ __html: content }} />
        {state.trim().length > 0 && <script type="text/javascript" dangerouslySetInnerHTML={{ __html: state }} />}
        {helmet.script.toComponent()}
        {scriptElements}
        {/* eslint-disable */}

        {/* Begin GTM and Inspectlet Asynchronous Code */}
        {(isProd) && (
          <>
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
            <script type="text/javascript" defer dangerouslySetInnerHTML={{ __html: `
              (function() {
                window.__insp = window.__insp || [];
                __insp.push(['wid', 1731141391]);
                var ldinsp = function(){
                if(typeof window.__inspld != "undefined") return; window.__inspld = 1; var insp = document.createElement('script'); insp.type = 'text/javascript'; insp.async = true; insp.id = "inspsync"; insp.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://cdn.inspectlet.com/inspectlet.js?wid=1731141391&r=' + Math.floor(new Date().getTime()/3600000); var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(insp, x); };
                setTimeout(ldinsp, 0);
              })();
            `}}></script>
          </>
        )}
        {/* End Inspectlet Asynchronous Code */}

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
  linkElements: PropTypes.array.isRequired,
  styleElements: PropTypes.array.isRequired,
  scriptElements: PropTypes.array.isRequired,
  state: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default Html;
