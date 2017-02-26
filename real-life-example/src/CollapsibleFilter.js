import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Image, Text, Animated } from 'react-native';
import Interactable from 'react-native-interactable';

const Screen = Dimensions.get('window');

export default class CollapsibleFilter extends Component {
  constructor(props) {
    super(props);
    this._deltaY = new Animated.Value(0);
  }
  render() {
    return (
      <View style={styles.container}>

        <View style={styles.filterContainer}>
          <View style={styles.filterField}>
            <Text style={styles.filterFieldText}>Anywhere</Text>
          </View>
          <Animated.View style={[styles.filterField, {
            opacity: this._deltaY.interpolate({
              inputRange: [-70, -70, -50, -50],
              outputRange: [0, 0, 1, 1]
            })
          }]}>
            <Text style={styles.filterFieldText}>Anytime</Text>
          </Animated.View>
          <Animated.View style={[styles.filterField, {
            opacity: this._deltaY.interpolate({
              inputRange: [-20, -20, 0, 0],
              outputRange: [0, 0, 1, 1]
            })
          }]}>
            <Text style={styles.filterFieldText}>Anything</Text>
          </Animated.View>
        </View>

        <Interactable.View
          verticalOnly={true}
          snapPoints={[{y: 0}, {y: -100}]}
          boundaries={{top: -100}}
          animatedValueY={this._deltaY}>
          <View style={styles.content}>
            <Text style={styles.panelTitle}>San Francisco Airport</Text>
            <Text style={styles.panelSubtitle}>International Airport - 40 miles away</Text>
            <Image style={styles.photo} source={require('../img/airport-photo.jpg')} />
            <View style={styles.panelButton}>
              <Text style={styles.panelButtonTitle}>Directions</Text>
            </View>
            <View style={styles.panelButton}>
              <Text style={styles.panelButtonTitle}>Search Nearby</Text>
            </View>
          </View>
        </Interactable.View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: 'white',
  },
  filterContainer: {
    backgroundColor: '#278485',
    paddingTop: 40
  },
  filterField: {
    height: 40,
    backgroundColor: '#3a969a',
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 4,
    justifyContent: 'center'
  },
  filterFieldText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 30
  },
  content: {
    padding: 20,
    backgroundColor: 'white'
  },
  panelTitle: {
    fontSize: 27,
    height: 35
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10
  },
  panelButton: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#de6d77',
    alignItems: 'center',
    marginVertical: 10
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white'
  },
  photo: {
    width: Screen.width-40,
    height: 275,
    marginBottom: 20
  }
});
