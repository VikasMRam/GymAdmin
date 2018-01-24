import React, { Component } from 'react';
import { resourceListReadRequest } from 'store/actions'
import { connect } from 'react-redux';
import { getList } from 'store/entities/selectors';
import { stringfyParams} from '../services/api/index'

class PropListPage extends Component {
  componentWillMount() {
    const { readProps} = this.props;
    readProps();
  }

  render() {
    const { list, state } = this.props;
    return (
      <ul>
        {list.map(p => (
          <li key={p.id}>
            { p.id }, { p.name}, {p.address.line1}, {p.address.city}, {p.address.state}
          </li>
        ))}
      </ul>
    );
  }
}

const params = { page_number: 1, page_size: 15 }

function mapStateToProps(state) {
  // let ids = []
  // if (state.resource && state.resource['properties'] && state.resource['properties'].list) {
  //   ids = state.resource['properties'].list;
  // }
  const endpoint = stringfyParams(params)
  let props = []
  if (state.entities.meta && state.entities.meta.properties) {
    props = (state.entities.meta.properties[endpoint].data || []).map(object => object.id);
  }
  const list = getList(state, 'properties', props);
  return { state, list }

};

const mapDispatchToProps = dispatch => ({
  readProps: () => dispatch(resourceListReadRequest('properties', params))
});

export default connect(mapStateToProps, mapDispatchToProps)(PropListPage);
