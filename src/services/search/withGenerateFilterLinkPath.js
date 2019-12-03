import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import withRouter from 'react-router/withRouter';
import queryString from 'query-string';

import { filterLinkPath, getSearchParams } from 'sly/services/helpers/search';
import { addEventToUrl } from 'sly/services/helpers/queryParamEvents';

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
  const WithGenerateFilterLinkPath = ({ match, location, ...props }) => (
    <ChildComponent generateFilterLinkPath={generateFilterLinkPath(getSearchParams(match, location))} {...props} />
  );

  WithGenerateFilterLinkPath.displayName = `WithGenerateFilterLinkPath(${getDisplayName(ChildComponent)})`;
  WithGenerateFilterLinkPath.WrappedComponent = ChildComponent;

  hoistNonReactStatic(WithGenerateFilterLinkPath, ChildComponent);

  return withRouter(WithGenerateFilterLinkPath);
}
