import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Interactable from 'react-native-interactable';

export default class MoreDrawers extends Component {
  render() {
    return (
      <View style={styles.container}>

        <View style={{backgroundColor: 'red', marginBottom: 50}}>
          <Interactable.View
            snapTo={[{x: 0}, {x: -230}]}
            horizontalOnly={true}>
            <View style={styles.cover}>
              <Text style={styles.label}>I am a drawer</Text>
            </View>
          </Interactable.View>
        </View>

        <View style={{backgroundColor: 'red', marginBottom: 50}}>
          <Interactable.View
            snapTo={[{x: 0}, {x: -230}]}
            limitX={{max: 0}}
            horizontalOnly={true}>
            <View style={styles.cover}>
              <Text style={styles.label}>I am a drawer</Text>
            </View>
          </Interactable.View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  cover: {
    left: 0,
    right: 0,
    height: 75,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center'
  },
  label: {
    textAlign: 'center',
    fontSize: 18
  }
});
