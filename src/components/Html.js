/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import config from 'sly/config';

const Html = ({
  styles, assets, state, content,
}) => {
  const helmet = Helmet.renderStatic();
  const htmlAttrs = helmet.htmlAttributes.toComponent();
  const bodyAttrs = helmet.bodyAttributes.toComponent();

  return (
    <html lang="en" {...htmlAttrs}>
      <head>
        <meta name="sly-version" content={config.version} />
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        {assets.css.map(path => (
          <link rel="stylesheet" type="text/css" key={path} href={path} />
        ))}
        {styles}
      </head>
      <body {...bodyAttrs}>
        <div id="app" dangerouslySetInnerHTML={{ __html: content }} />
        {state.trim().length > 0 && <script dangerouslySetInnerHTML={{ __html: state }} />}
        {assets.js.map(path => <script key={path} src={`${path}`} async defer />)}
        {helmet.script.toComponent()}
        {helmet.noscript.toComponent()}
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
