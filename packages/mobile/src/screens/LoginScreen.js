import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';

// todo: temp uncomment
// import AuthContainer from 'sly/common/services/auth/containers/AuthContainer';

export default class LoginScreen extends Component {
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
          >
            {/* todo: temp comment
            <AuthContainer
              type="inline"
            />
            */}
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}
