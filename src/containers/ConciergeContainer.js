import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, func, bool, object } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import { getDetail } from 'sly/store/selectors';
import { next, close } from 'sly/store/concierge/actions';

import Concierge from 'sly/components/organisms/Concierge';
import { conciergeSelector } from 'sly/store/concierge/selectors';

import {
  resourceDetailReadRequest,
} from 'sly/store/resource/actions';

class ConciergeContainer extends Component {
  static propTypes = {
    // TODO: shape
    next: func.isRequired,
    close: func.isRequired,
    community: object,
    concierge: object.isRequired,
  };

  render() {
    const { next, close, ...props } = this.props;
    // I return an array here as Concierge is not even rendered here in the three

    return (
      <Concierge
        key="modal"
        onClose={close}
        next={next}
        {...props}
      />
    );
  }
}

const mapStateToProps = (state, { community }) => {
  const concierge = conciergeSelector(state, community.id);
  return {
    concierge,
    community,
  };
};

export default connect(mapStateToProps, { next, close })(ConciergeContainer);
