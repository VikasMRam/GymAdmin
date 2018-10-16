import React, { Component } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';

import { getQueryParamsSetter } from 'sly/services/helpers/queryParams';

import JoinSlyButtons from 'sly/components/molecules/JoinSlyButtons';

class JoinSlyButtonsContainer extends Component {
  static propTypes = {
    setQueryParams: func,
    onSubmitSuccess: func,
    onLoginClicked: func,
    onEmailSignupClicked: func,
  };

  componentDidMount() {
    if (window.gapi) {
      window.gapi.load('auth2', () => {
        if (!window.gapi.auth2.getAuthInstance()) {
          window.gapi.auth2.init();
        }
      });
    }
  }

  handleContinueWithFacebookClick = () => {
    if (window.FB) {
      window.FB.login((response) => {
        console.log(response);
      }, { scope: 'public_profile,email' });
    }
  }

  handleContinueWithGoogleClick = () => {
    if (window.gapi) {
      const auth2 = window.gapi.auth2.getAuthInstance();
      auth2.signIn().then(res => console.log(res.getBasicProfile()), err => console.log(err));
    }
  }

  render() {
    const { onLoginClicked, onEmailSignupClicked } = this.props;

    return (
      <JoinSlyButtons
        onContinueWithFacebookClicked={this.handleContinueWithFacebookClick}
        onContinueWithGoogleClicked={this.handleContinueWithGoogleClick}
        onLoginClicked={onLoginClicked}
        onEmailSignupClicked={onEmailSignupClicked}
      />
    );
  }
}

const mapStateToProps = (state, { history, location }) => ({
  setQueryParams: getQueryParamsSetter(history, location),
});

export default connect(mapStateToProps)(JoinSlyButtonsContainer);
