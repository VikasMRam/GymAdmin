import React, { Component } from 'react';
import { object, func } from 'prop-types';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { connect } from 'react-redux';

import { withAuth } from 'sly/web/services/api';
import { Badge } from 'sly/common/components/atoms';

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'black',
  },
  body: {
    backgroundColor: 'white',
  },
});

const mapStateToProps = state => ({
  authenticated: state.authenticated,
});

@withAuth
@connect(mapStateToProps)

export default class LoginScreen extends Component {
  static propTypes = {
    authenticated: object.isRequired,
    loginUser: func.isRequired,
  };

  static defaultProps = {
    authenticated: {},
  };

  handleOnClick = (values) => {
    const { loginUser } = this.props;
    const payload = {
      email: 'amal@seniorly.com',
      password: 'password',
    };

    console.log(values);

    return loginUser(payload)
      .then((r) => {
        console.log(r);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    const { authenticated } = this.props;

    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}
          >
            <View style={styles.body}>
              <Badge palette="primary" textPalette="white"><Text>Howdy</Text></Badge>
              <Text onPress={this.handleOnClick}>
                Hello Sly:
                {JSON.stringify(authenticated)}
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}
