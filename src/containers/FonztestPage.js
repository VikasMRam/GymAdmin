import React, { Component } from 'react';
import { resourceListReadRequest } from 'store/actions'
import { connect } from 'react-redux';

import { getList } from 'store/entities/selectors';

class FonztestPage extends Component {
  componentWillMount() {
    const { readUsers } = this.props;
    readUsers();
  }

  render() {
    const { list, state } = this.props;
    console.log(state.entities);
    return (
      <ul>
        {list.map(item => (
          <li key={item.id}>
            { JSON.stringify(item) }
          </li>
        ))}
      </ul> 
    );
  }
}

const mapStateToProps = state => ({
  state,
  list: getList(state, 'users'), 
});

const mapDispatchToProps = dispatch => ({
  readUsers: () => dispatch(resourceListReadRequest('users')),
});

export default connect(mapStateToProps, mapDispatchToProps)(FonztestPage);
