import React from 'react';
import { object } from 'prop-types';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { withRouter } from 'react-router-dom';

import Datatable from 'sly/services/datatable/components/Datatable';

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
        sectionFilters: object.isRequired,
        filters: object.isRequired,
      };

      render() {
        const { sectionFilters, filters } = this.props;

        return (
          <Datatable
            id={id}
            sectionFilters={sectionFilters}
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

