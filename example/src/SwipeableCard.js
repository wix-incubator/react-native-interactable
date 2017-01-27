import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Interactable from 'react-native-interactable';

export default class SwipeableCard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Interactable.View
          key="first"
          horizontalOnly={true}
          resistance={3000}
          snapTo={[
            {x: 350},
            {x: 0},
            {x: -350}
          ]}
        >
          <View style={{width: 300, height: 200, backgroundColor: 'red', borderRadius: 8, marginVertical: 6}} />
        </Interactable.View>
        <Interactable.View
          key="second"
          horizontalOnly={true}
          snapTo={[
            {x: 350},
            {x: 0},
            {x: -350}
          ]}
        >
          <View style={{width: 300, height: 200, backgroundColor: 'red', borderRadius: 8, marginVertical: 6}} />
        </Interactable.View>
        <Interactable.View
          key="third"
          horizontalOnly={true}
          allowRotation={true}
          snapTo={[
            {x: 350},
            {x: 0},
            {x: -350}
          ]}
        >
          <View style={{width: 300, height: 200, backgroundColor: 'red', borderRadius: 8, marginVertical: 6}} />
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
