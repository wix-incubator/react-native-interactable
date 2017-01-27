import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Interactable from 'react-native-interactable';

export default class CollapsingHeader extends Component {
  render() {
    return (
      <View style={styles.container}>
          <View style={{backgroundColor: 'red', height: 200}}>
          </View>
          <Interactable.View
            verticalOnly={true}
          >
            <View style={{left: 0, right: 0, height: 600, backgroundColor: '#e0e0e0'}} />
          </Interactable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  }
});
