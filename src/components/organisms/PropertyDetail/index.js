import React, { Component } from 'react';

import { CareServicesList } from 'sly/components/organisms';

export default class PropertyDetail extends Component {
  render() {
    const { detail } = this.props;
    if(detail) {
      console.log(JSON.stringify((detail)));
      const { name, propInfo } = detail;
      const { careServices, serviceHighlights } = propInfo;
      return (
        <div>
          {name}
          <CareServicesList propertyName={name} careServices={careServices} serviceHighlights={serviceHighlights} />
        </div>
      );
    }
    else{
      return <div>Loading...</div>;
    }
  }
}
