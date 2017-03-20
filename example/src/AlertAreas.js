import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Interactable from 'react-native-interactable';

const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height - 75
};

export default class AlertAreas extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.markerContainer}><View style={{backgroundColor: '#00ff0030', position: 'absolute', left: Screen.width/2 + 100, right: 0, top: 0, bottom: 0}} /></View>
        <View style={styles.markerContainer}><View style={{backgroundColor: '#ffff0060', position: 'absolute', left: Screen.width/2 - 150, right: Screen.width/2 + 50, top: Screen.height/2 + 100, bottom: Screen.height/2 - 200}} /></View>
        <Interactable.View
          snapPoints={[{x: -140, y: -0}, {x: 140, y: -250}, {x: -140, y: 250}, {x: 140, y: 250}]}
          alertAreas={[
            {id: 'green', influenceArea: {left: 100}},
            {id: 'yellow', influenceArea: {top: 100, bottom: 200, left: -150, right: -50}}
          ]}
          onAlert={this.onAlert.bind(this)}
          initialPosition={{x: -140, y: -250}}>
          <View style={{width: 70, height: 70, backgroundColor: 'red', borderRadius: 35}} />
        </Interactable.View>
      </View>
    );
  }
  onAlert(event) {
    console.log(event.nativeEvent);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  markerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
});
