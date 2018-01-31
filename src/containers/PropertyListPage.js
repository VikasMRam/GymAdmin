import React, {Component} from 'react';
import {resourceListReadRequest} from 'store/actions';
import {connect} from 'react-redux';
import {RgsCard} from 'components';
import { withDone } from 'react-router-server';

import {getList} from 'store/entities/selectors';

class PropertyListPage extends Component {
  componentWillMount() {
    const {readPropList} = this.props;
    readPropList();
  }

  render() {
    const {list} = this.props;
    return (
      list.map(item => (
          <RgsCard key={item.id} {...item} />
      ))

    );
  }
}

const mapStateToProps = state => ({
  state,
  list: getList(state, 'properties'),
});

const mapDispatchToProps = (dispatch,{done}) => ({
  readPropList: () => dispatch(resourceListReadRequest('properties')).then(done,done),
});

export default withDone(connect(mapStateToProps, mapDispatchToProps)(PropertyListPage));
