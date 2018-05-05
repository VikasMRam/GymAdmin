import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, func, bool, object } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import { getDetail } from 'sly/store/selectors';

import CommunityFilterList from 'sly/components/organisms/CommunityFilterList';


class CommunitySearchFilterContainer extends Component {

  // state = {
  //   // currentStep: 'conversionForm',
  //   // modalIsOpen: false,
  // };
  // onChange = (uiFieldEvt) => {
  //   const { onChange } = this.props;
  //   console.log("FILTER CONTAINER Seeing the ui event, ", uiFieldEvt);
  //   //I can add some more information here if i need to....
  //   onChange(uiFieldEvt);
  //   return;
  // };




  render() {
    const { ...props } = this.props;


    return (
      <CommunityFilterList
        // onFieldChange={this.onChange}
        {...props}
      />
    );
  }
}


const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(CommunitySearchFilterContainer);
