import React, { Component } from 'react';
import { resourceListReadRequest } from 'store/actions'
import { connect } from 'react-redux';

class FonztestPage extends Component {
  componentWillMount() {
    const { readUsers } = this.props;
    readUsers();
  }

  render() {
    return "Hey ho!";
  }
}

const mapDispatchToProps = (dispatch, { limit }) => ({
  readUsers: () => dispatch(resourceListReadRequest('users')),
});

export default connect(() => ({}), mapDispatchToProps)(FonztestPage);
