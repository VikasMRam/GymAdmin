import React from 'react';
import { connect } from 'react-redux';

import { ensureAuthenticated } from 'sly/store/actions';
import { getDetail } from 'sly/store/selectors';

export default function authenticated(ChildComponent) {
  const Authenticated = props => <ChildComponent {...props} />;
  Authenticated.displayName = `Authenticated(${ChildComponent.name || 'Authenticated'})`;

  const mapStateToProps = (state) => {
    const user = getDetail(state, 'user', 'me');
    return {
      user,
      ensureAuthenticated: action => user ? action : ensureAuthenticated(action),
    };
  };

  return connect(mapStateToProps)(Authenticated);
}
