import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
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
          <View style={{width: 70, height: 70, backgroundColor: '#3182C8', borderRadius: 35}} />
        </Interactable.View>
        <Interactable.View
          style={{zIndex: 2}}
          ref='green'
          snapPoints={snapPoints}
          initialPosition={{x: -140, y: 0}}
        >
          <View style={{width: 70, height: 70, backgroundColor: '#32B76C', borderRadius: 35}} />
        </Interactable.View>
        <View style={{
          position: 'absolute',
          top: 50,
          left: 50,
          zIndex: 1,
        }}>
          <TouchableOpacity
            onPress={() => {
              this.refs['blue'].changePosition(blueDestination)
            }}
          >
            <Text style={{color: '#3182C8', borderColor: '#3182C8', borderWidth: 1, padding: 6, borderRadius: 15, alignSelf: 'center'}}>{"ChangePosition to " + JSON.stringify(blueDestination)}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.refs['green'].changePosition({
                x: (Math.random() - 0.5) * 280,
                y: (Math.random() - 0.5) * 500}
              )
            }}
          >
            <Text style={{color: '#32B76C', borderColor: '#32B76C', borderWidth: 1, padding: 6, borderRadius: 15, alignSelf: 'center', margin: 10}}>ChangePosition to random</Text>
          </TouchableOpacity>
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
  }
});
