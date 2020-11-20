import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import queryString from 'query-string';
import { object } from 'prop-types';

import { withRouter } from 'react-router';
import { filterLinkPath } from 'sly/web/components/search/helpers';
import { addEventToUrl } from 'sly/web/services/helpers/queryParamEvents';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

const generateFilterLinkPath = searchParams => ({ changedParams = {}, paramsToRemove = [] }) => {
  const changedAndRemovedParams = paramsToRemove.reduce((cumul, param) => {
    cumul[param] = param === 'toc' ? 'nursing-homes' : undefined;
    return cumul;
  }, changedParams);

  const { path } = filterLinkPath(searchParams, changedAndRemovedParams);
  const event = {
    action: 'search',
    category: searchParams.toc,
    label: queryString.stringify(searchParams),
  };

  return addEventToUrl(path, event);
};

export default function withGenerateFilterLinkPath(ChildComponent) {
  const WithGenerateFilterLinkPath = props => (
    <ChildComponent
      generateFilterLinkPath={generateFilterLinkPath(props.searchParams)}
      {...props}
    />
  );

  WithGenerateFilterLinkPath.displayName = `WithGenerateFilterLinkPath(${getDisplayName(ChildComponent)})`;
  WithGenerateFilterLinkPath.WrappedComponent = ChildComponent;
  WithGenerateFilterLinkPath.propTypes = {
    searchParams: object,
  };

  hoistNonReactStatic(WithGenerateFilterLinkPath, ChildComponent);

  return withRouter(WithGenerateFilterLinkPath);
}
