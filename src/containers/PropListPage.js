import React, { Component } from 'react';
import { resourceListReadRequest } from 'store/actions';
import { connect } from 'react-redux';
import build from 'store/entities/selectors';
import { getList } from 'store/entities/selectors';

class PropListPage extends Component {
  componentWillMount() {
    const { readProps } = this.props;
    readProps();
  }

  render() {
    const { list, state } = this.props;
    return (
      <ul>
        {list.map(p => (
          <li key={p.id}>
            {p.id}, {p.name}, {p.address.line1}, {p.address.city},{' '}
            {p.address.state}
          </li>
        ))}
      </ul>
    );
  }
}

function mapStateToProps(state) {
  const list = getList(state, 'properties');
  return { state, list };
}

const mapDispatchToProps = dispatch => ({
  readProps: () => dispatch(resourceListReadRequest('properties')),
});

export default connect(mapStateToProps, mapDispatchToProps)(PropListPage);
