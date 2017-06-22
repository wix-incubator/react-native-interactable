import React, { Component } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import Interactable from 'react-native-interactable';

export default class ChangePosition extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const snapPoints = [
            {x: -140, y: -250},
            {x: 140, y: -250},
            {x: -140, y: -120},
            {x: 140, y: -120},
            {x: -140, y: 0},
            {x: 140, y: 0},
            {x: -140, y: 120},
            {x: 140, y: 120},
            {x: -140, y: 250},
            {x: 140, y: 250}
          ];
    const blueDestination = snapPoints[3];
    return (
      <View style={styles.container}>
        <Interactable.View
          style={{zIndex: 2}}
          ref='blue'
          snapPoints={snapPoints}
          initialPosition={{x: -140, y: 0}}
        >
          <View style={{width: 70, height: 70, backgroundColor: 'blue', borderRadius: 35}} />
        </Interactable.View>
        <Interactable.View
          style={{zIndex: 2}}
          ref='green'
          snapPoints={snapPoints}
          initialPosition={{x: -140, y: 0}}
        >
          <View style={{width: 70, height: 70, backgroundColor: 'green', borderRadius: 35}} />
        </Interactable.View>
        <View style={{
          position: 'absolute',
          left: 80,
          zIndex: 1
        }}>
          <Button color='blue' title={"ChangePosition to " + blueDestination} onPress={() => {
            this.refs['blue'].changePosition(blueDestination);
          }}/>
          <Button color='green' title="ChangePosition to random" onPress={() => {
            this.refs['green'].changePosition({x: (Math.random() - 0.5) * 280, y: (Math.random() - 0.5) * 500});
          }}/>
        </View>
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
  },
});
