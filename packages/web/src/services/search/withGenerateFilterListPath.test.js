import { Route, StaticRouter } from 'react-router';
import React from 'react';
import { mount } from 'enzyme';
import queryString from 'query-string';

import withGenerateFilterLinkPath from 'sly/web/services/search/withGenerateFilterLinkPath';
import careTypes from 'sly/web/constants/careTypes';
import { addEventToUrl } from 'sly/web/services/helpers/queryParamEvents';
import { getSearchParams } from 'sly/web/components/search/helpers';
import { withProps } from 'sly/web/services/helpers/hocs';

function Component() {
  return null;
}

function mountComponent(url) {
  const DecoratedComponent = withProps(({ match, location }) => ({
    searchParams: getSearchParams(match, location),
  }))(withGenerateFilterLinkPath(Component));
  const wrapper = mount(
    <StaticRouter location={url} context={{}}>
      <Route path={`/:toc(${careTypes.join('|')})/:state/:city`} component={DecoratedComponent} />
    </StaticRouter>,
  );

  return {
    wrapper,
  };
}

describe('Given the withGenerateFilterListPath higher-order component', () => {
  describe('when a component is wrapped in withGenerateFilterListPath', () => {
    it('should provide function that can generate a path with params removed', () => {
      const { wrapper } = mountComponent('/assisted-living/texas/dallas?size=small&budget=10');

      const generatedPath = wrapper.find(Component).prop('generateFilterLinkPath')({ paramsToRemove: ['size'] });

      const expectedEvent = {
        action: 'search',
        category: 'assisted-living',
        label: queryString.stringify({
          toc: 'assisted-living',
          state: 'texas',
          city: 'dallas',
          size: 'small',
          budget: '10',
        }),
      };
      expect(generatedPath).toBe(addEventToUrl('/assisted-living/texas/dallas?budget=10', expectedEvent));
    });
    it('should provide function that can generate a path with changed parameters', () => {
      const { wrapper } = mountComponent('/assisted-living/texas/dallas?size=small&budget=10');

      const generatedPath = wrapper.find(Component).prop('generateFilterLinkPath')({
        changedParams: { city: 'houston', budget: '10000', sort: 'price' },
      });

      const expectedEvent = {
        action: 'search',
        category: 'assisted-living',
        label: queryString.stringify({
          toc: 'assisted-living',
          state: 'texas',
          city: 'dallas',
          size: 'small',
          budget: '10',
        }),
      };
      expect(generatedPath).toBe(
        addEventToUrl('/assisted-living/texas/houston?budget=10000&size=small&sort=price', expectedEvent),
      );
    });
    it('should set toc to retirement community if removed', () => {
      const { wrapper } = mountComponent('/assisted-living/texas/dallas');

      const generatedPath = wrapper.find(Component).prop('generateFilterLinkPath')({
        paramsToRemove: ['toc'],
      });

      const expectedEvent = {
        action: 'search',
        category: 'assisted-living',
        label: queryString.stringify({
          toc: 'assisted-living',
          state: 'texas',
          city: 'dallas',
        }),
      };
      expect(generatedPath).toBe(addEventToUrl('/nursing-homes/texas/dallas', expectedEvent));
    });
  });
});
