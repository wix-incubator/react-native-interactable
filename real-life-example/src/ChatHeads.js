import React, { Component } from 'react';
import { StyleSheet, View, Image, Animated } from 'react-native';
import Interactable from 'react-native-interactable';

export default class ChatHeads extends Component {
  constructor(props) {
    super(props);
    this._deltaX = new Animated.Value(0);
    this._deltaY = new Animated.Value(0);
    this._face1Scale = new Animated.Value(1);
    this._face2Scale = new Animated.Value(1);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.frame}>
          <Animated.Image
            source={require('../img/chatheads-delete.png')}
            style={[styles.marker, {top: 200}, {
              transform: [{
                translateX: this._deltaX.interpolate({
                  inputRange: [-140, 140],
                  outputRange: [-10, 10]
                })
              },
              {
                translateY: this._deltaY.interpolate({
                  inputRange: [-270, -30, 50, 270],
                  outputRange: [280, 280, -10, 10]
                })
              }]
            }
          ]} />
        </View>
        <View style={styles.frame} pointerEvents='box-none'>
          <Interactable.View
            snapPoints={[
              {x: -140, y: 0}, {x: -140, y: -140}, {x: -140, y:  140}, {x: -140, y: -270}, {x: -140, y: 270},
              {x:  140, y: 0}, {x:  140, y:  140}, {x:  140, y: -140}, {x:  140, y: -270}, {x:  140, y: 270}]}
            dragWithSpring={{tension: 2000, damping: 0.5}}
            gravityPoints={[{x: 0, y: 200, strength: 8000, falloff: 40, damping: 0.5, haptics: true}]}
            onStop={(event) => this.onStopInteraction(event, this._face1Scale)}
            animatedValueX={this._deltaX}
            animatedValueY={this._deltaY}
            initialPosition={{x: -140, y: -270}}>
            <Animated.View style={[styles.head, {
              transform: [{
                scale: this._face1Scale
              }]
            }]}>
              <Image style={styles.image} source={require('../img/chatheads-face1.jpg')} />
            </Animated.View>
          </Interactable.View>
        </View>
        <View style={styles.frame} pointerEvents='box-none'>
          <Interactable.View
            snapPoints={[
              {x: -140, y: 20}, {x: -140, y: -120}, {x: -140, y:  160}, {x: -140, y: -250}, {x: -140, y: 290},
              {x:  140, y: 20}, {x:  140, y:  160}, {x:  140, y: -120}, {x:  140, y: -250}, {x:  140, y: 290}]}
            dragWithSpring={{tension: 2000, damping: 0.5}}
            gravityPoints={[{x: 0, y: 200, strength: 8000, falloff: 40, damping: 0.5, haptics: true}]}
            onStop={(event) => this.onStopInteraction(event, this._face2Scale)}
            animatedValueX={this._deltaX}
            animatedValueY={this._deltaY}
            initialPosition={{x: 140, y: -250}}>
            <Animated.View style={[styles.head, {
              transform: [{
                scale: this._face2Scale
              }]
            }]}>
              <Image style={styles.image} source={require('../img/chatheads-face2.jpg')} />
            </Animated.View>
          </Interactable.View>
        </View>
      </View>
    );
  }
  onStopInteraction(event, scaleValue) {
    const x = event.nativeEvent.x;
    const y = event.nativeEvent.y;
    if (x > -10 && x < 10 && y < 210 && y > 190) {
      Animated.timing(scaleValue, {toValue: 0, duration: 300}).start();
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eff7ff',
  },
  head: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#dddddd',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 3,
    shadowOpacity: 0.8
  },
  image: {
    width: 78,
    height: 78,
    borderRadius: 40,
  },
  frame: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  marker: {
    width: 60,
    height: 60,
    margin: 10,
    position: 'relative'
  },
});
