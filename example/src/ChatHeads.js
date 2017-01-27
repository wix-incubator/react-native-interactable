import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Interactable from 'react-native-interactable';

export default class ChatHeads extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Interactable.View
          snapTo={[
            {x: -140, y: -280},
            {x: 140, y: -280},
            {x: -140, y: -140},
            {x: 140, y: -140},
            {x: -140, y: 0},
            {x: 140, y: 0},
            {x: -140, y: 140},
            {x: 140, y: 140},
            {x: -140, y: 280},
            {x: 140, y: 280, damping: 0.05}
          ]}
        >
          <View style={{width: 50, height: 50, backgroundColor: 'red', borderRadius: 25}} />
        </Interactable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  }
});
