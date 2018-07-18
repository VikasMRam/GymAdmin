import React, { Component } from 'react';
import PropTypes from "prop-types";

import CollapsibleBlock  from 'sly/components/molecules/CollapsibleBlock';


export default class CommunityLocalDetails extends  Component{
  static propTypes = {
    localDetails: PropTypes.string,
  };
  static defaultProps = {
    localDetails: '',
  };

  render(){
    const {
      localDetails
    } = this.props;
    if (localDetails) {
      return (
        <CollapsibleBlock collapsedDefault={false} >
          <div dangerouslySetInnerHTML={{ __html: localDetails }}></div>
        </CollapsibleBlock>)
    } else {
      return <div></div>;
    }

  }
};


