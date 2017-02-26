import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Image, Text, Animated } from 'react-native';
import Interactable from 'react-native-interactable';

const Screen = Dimensions.get('window');

export default class NowCard extends Component {
  constructor(props) {
    super(props);
    this._deltaX = new Animated.Value(0);
  }
  render() {
    return (
      <View style={styles.container}>

        <Interactable.View
          horizontalOnly={true}
          snapPoints={[
            {x: 360},
            {x: 0, damping: 0.7},
            {x: -360}
          ]}
          animatedValueX={this._deltaX}>
          <Animated.View style={[styles.card, {
            opacity: this._deltaX.interpolate({
              inputRange: [-300, -300, 0, 300, 300],
              outputRange: [0, 0, 1, 0, 0]
            })
          }]}>
            <Text style={styles.header}>Info for you</Text>
            <Image style={styles.image} source={require('../img/card-photo.jpg')} />
            <Text style={styles.title}>Card Title</Text>
            <Text style={styles.body}>This is the card body, it can be long</Text>
          </Animated.View>
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
    backgroundColor: '#efefef',
  },
  card: {
    width: Screen.width - 40,
    backgroundColor: 'white',
    borderRadius: 6,
    marginHorizontal: 20,
    shadowColor: '#7f7f7f',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 2,
    shadowOpacity: 0.4
  },
  image: {
    width: Screen.width - 40,
    height: 150
  },
  header: {
    marginTop: 8,
    marginLeft: 20,
    height: 22,
    fontSize: 12,
    color: '#7b7b7b',
    overflow: 'hidden'
  },
  title: {
    fontSize: 18,
    marginTop: 15,
    marginBottom: 10,
    marginLeft: 15
  },
  body: {
    marginBottom: 20,
    fontSize: 15,
    marginLeft: 15,
    color: '#7f7f7f'
  }
});
