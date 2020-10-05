import React from 'react';
import { object } from 'prop-types';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { parse } from 'query-string';
import { withRouter } from 'react-router';

import Datatable from 'sly/web/services/datatable/components/Datatable';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';
}

export default function withDatatable(id) {
  return (InnerComponent) => {
    @withRouter
    class Wrapper extends React.Component {
      static displayName = `withDatatable(${getDisplayName(InnerComponent)})`;
      static WrappedComponent = InnerComponent;
      static propTypes = {
        sectionFilters: object,
        location: object,
      };
      static defaultPropTypes = {
        sectionFilters: {},
      };

      render() {
        const { location, sectionFilters } = this.props;

        const { 'page-number': pageNumber, ...filters } = parse(location.search);
        const combinedSectionFilters = {
          'page-number': pageNumber,
          ...sectionFilters,
        };

        return (
          <Datatable
            id={id}
            sectionFilters={combinedSectionFilters}
            filters={filters}
          >
            {datatable => <InnerComponent datatable={datatable} {...this.props} />}
          </Datatable>
        );
      }
    }

    hoistNonReactStatic(Wrapper, InnerComponent);

    return Wrapper;
  };
}

